const Alexa = require('ask-sdk-core');
const lightning = require('./lnd_grpc_interface');
const User = require('./models/user');
const Address = require('./models/address');

const MAIN_MENU_PROMPT = `Main Menu. You can send or request a payment.
                          View your channels. Or view your address book.
                          You can also change your settings. `;

const CHANNELS_MENU_PROMPT = `Channels Menu. You can open a new channel.
                              Close an existing channel. List your open
                              channels. Get information about an open
                              channel. Or go back to the main menu. `;

const ADDRESS_BOOK_MENU_PROMPT = `Address Book Menu. You can add a new address.
                                  Delete an existing address. List all of the
                                  addresses saved in your address book. Or go
                                  back to the main menu. `;

const SETTINGS_MENU_PROMPT = `Settings Menu. You can set your preferred fiat
                              currency. Set your preferred bitcoin unit. Or
                              go back to the main menu. `;



const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    //get current session data
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    speechText += 'Welcome to the lightning wallet. ';
    speechText += MAIN_MENU_PROMPT;
    repromptText += MAIN_MENU_PROMPT;

    //Create a remote "Bob" address that our user can connect to
    /*In the future this will be taken care of through user iniput rather
    than hardcoded into the app. */
    let bobAddress = new Address('Bob', '03ac2c185f8ac3122028572a44b3c8d85af39ffca3e2d705c92a435149f6118ef5@3.83.83.82:10002');
    let user = new User();
    user.getAddressBook().addAddress(bobAddress);

    console.log("USER ADDRESS BOOK LENGTH:" + user.getAddressBook().getLength());

    //Bob should be the user's peer so that we can open channel/send payment
    //CONNECT OVER P2P
    /*let request = {
      addr: (user.getAddressBook().getAddressFromNickname('Bob')).pubKey;
    }

    lightning.connectPeer(request, function(err, response) {
      console.log("CONNECTING TO PEER");
      console.log(response);
    });*/

    //save current user in current sessionn
    sessionAttributes.user = JSON.stringify(user);

    //save current session data
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      //.withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

//Initiates the process of paying for a recieved invoice on an open channel
const SendPaymentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'SendPaymentIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    let user = new User(JSON.parse(sessionAttributes.user)); //get user here from sessionVariables

    //Are there any open channels?
    if(user.getChannelList().length) { //there are open channels
      //Handle sending a payment:
      //Which channel would you like to use/Who would you like to send the money to?
      //How much would you like to send?
      //Handle verification as well (Make sure user actually has that much money availble)
    }
    else { //no open channels
      speechText += "I am sorry. You currently do not have any open channels. ";
      speechText += "You need to open a channel in order to send a payment. ";
    }

    sessionAttributes.user = JSON.stringify(user);
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
}

//Initiates the process of generating and sending an invoice on an open channel
const RequestPaymentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'RequestPaymentIntent';
  },
  handle(handlerInput) {

    let speechText = "";
    let repromptText = "";

    //Generate Invoice
    //How much would you like to request?
    //Send the payment ID to an Alexa Card for the user to copy and use

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
}

//Open the channels menu and prompt the user for action
const ChannelsMenuHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'ChannelsMenuIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += CHANNELS_MENU_PROMPT;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
}

const StartedOpenChannelHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'OpenChannelIntent'
    && handlerInput.requestEnvelope.request.dialogState === 'STARTED';
  },
  handle(handlerInput) {

    let speechText = "";
    let repromptText = "";

    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); //get the user from the sessionVariables
    let user = new User(JSON.parse(sessionAttributes.user));

    //Check if the user has any registered addresses
    if(user.getAddressBook().getLength()) {

      speechText += "Who would you like to open a channel with? ";
      speechText += "Your address book currently contains. ";
      let addressList = user.getAddressBook().getAllAddresses();
      for(var i = 0; i<addressList.length; i++)
        speechText += addressList[i].getNickname() + ". ";
      //How much would you like to commit to the channel

      const currentIntent = handlerInput.requestEnvelope.request.intent;

      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .addDelegateDirective(currentIntent)
      .getResponse();
    }
    else { //The user currently has no addresses
      speechText += "You currently have nobody in your address book. ";
      speechText += "You cannot open a new channel until you have at least "
      speechText += "one address saved in your address book. You can add a new ";
      speechText += "address to your address book by visting the website. ";

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse();
    }
  },
}

const InProgressOpenChannelHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'OpenChannelIntent'
    && handlerInput.requestEnvelope.request.dialogState === 'IN_PROGRESS';
  },
  handle(handlerInput) {

    let speechText = "";
    let repromptText = "";

    //get user data
    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); //get the user from the sessionVariables
    let user = new User(JSON.parse(sessionAttributes.user));

    let givenNickname = handlerInput.requestEnvelope.request.intent.slots.nickname.value;
    let givenSatoshis = handlerInput.requestEnvelope.request.intent.slots.amount.value;

    const currentIntent = handlerInput.requestEnvelope.request.intent;

    //check that address exists
    if(!(user.getAddressBook().isNicknameInAddressBook(givenNickname))) {
      speechText += "I am sorry that name was not found in your address book. ";
      speechText += "Who would you like to open a channel with? ";
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .addElicitSlotDirective('nickname', currentIntent)
        .getResponse();
    }

    //check that the user has enough satoshis

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .addDelegateDirective()
      .getResponse();
  },
}

//Initiates the process of opening a new channel
const CompletedOpenChannelHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'OpenChannelIntent'
    && handlerInput.requestEnvelope.request.dialogState === 'COMPLETED';
  },
  async handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); //get the user from the sessionVariables

    let user = new User(JSON.parse(sessionAttributes.user));

    let givenNickname = handlerInput.requestEnvelope.request.intent.slots.nickname.value;
    let givenSatoshis = handlerInput.requestEnvelope.request.intent.slots.amount.value;

    speechText += "COMPLETED open channel";

    //channel object should be created and added to the user object. This
    //can be used later when the user wants to close or view a channel

    //open the channel
    var request = {
      node_pubkey: (user.getAddressBook().getAddressFromNickname(givenNickname)).getPubKey(),
      local_funding_amount: givenSatoshis
    }

    //Use gRPC to open a channel
    //Make sure to check that the channel remains open
    /*var call = lightning.openChannel(request);
    call.on('data', function(response) {
    // A response was received from the server.
    console.log(response);
    });
    call.on('status', function(status) {
    // The current status of the stream.
    });
    call.on('end', function() {
    // The server has closed the stream.
    });*/

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();

  },
}

//Initiates the process of closing a currently open channel
const CloseChannelHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'CloseChannelIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Handle closing a channel. ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
}

//Gives the user a list of all channels that are currently open
const ListOpenChannelsHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'ListOpenChannelsIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Handle listing all channels. ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
}

//Gives the user information about a specific channel
const GetInformationAboutOpenChannelHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'GetInformationAboutOpenChannelIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Handle giving channel information. ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
}

//Open the Address book menu and prompt the user for action
const AddressBookMenuHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'AddressBookMenuIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += ADDRESS_BOOK_MENU_PROMPT;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
}

//Gives the user a list of all addresses that they have saved
const ListAllAddressesHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'ListAllAddressesIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Handle listing all addresses. ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
}

//Initiates the process of adding a new address to the address book
const AddNewAddressHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'AddNewAddressIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "To add a new address please visit our website. ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
}

//Initiates the process of deleting an address
const DeleteAddressHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'DeleteAddressIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Handle deleting an address. ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();

  },
}

//Open the settings menu and prompt the user for action
const OpenSettingsMenuHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'OpenSettingsMenuIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += SETTINGS_MENU_PROMPT;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();

  },
}

//Allows the user to set their preferred fiat currency (usd, euro, etc)
const SetFiatCurrencyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'SetFiatCurrencyIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Handle setting preferred fiat currency. ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();

  },
}

//Allows the user to set their preferred bitcoin unit (Satoshis or Bitcoin)
const SetBitcoinUnitHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'SetBitcoinUnitIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Handle setting preferred bitcoin unit. ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();

  },
}

//Open the main menu and prompt the user for action
const MainMenuHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'MainMenuIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += MAIN_MENU_PROMPT;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();

  },
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Give the user instructions based on the current state.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Bye!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    SendPaymentHandler,
    RequestPaymentHandler,
    ChannelsMenuHandler,
    StartedOpenChannelHandler,
    CompletedOpenChannelHandler,
    InProgressOpenChannelHandler,
    CloseChannelHandler,
    ListOpenChannelsHandler,
    GetInformationAboutOpenChannelHandler,
    AddressBookMenuHandler,
    ListAllAddressesHandler,
    AddNewAddressHandler,
    DeleteAddressHandler,
    OpenSettingsMenuHandler,
    SetFiatCurrencyHandler,
    SetBitcoinUnitHandler,
    MainMenuHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
