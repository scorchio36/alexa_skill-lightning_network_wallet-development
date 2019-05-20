const Alexa = require('ask-sdk-core');

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

    speechText += 'Welcome to the lightning wallet. ';
    speechText += MAIN_MENU_PROMPT;
    repromptText += MAIN_MENU_PROMPT;


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

    speechText += "Handle sending payments here. "

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

    speechText += "Handle creating invoices here. ";

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

//Initiates the process of opening a new channel
const OpenChannelHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'OpenChannelIntent';
  },
  handle(handlerInput) {
    let speechText = "";
    let repromptText = "";

    speechText += "Handle opening a channel. ";

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

    speechText += "Handle adding new address. ";

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
    OpenChannelHandler,
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
