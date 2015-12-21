'use strict';

// Loading dependencies, caching selectors and defining other variables.
var Ajax = require('simple-ajax'),
    i18nHelper = require('./utils/i18n-helper'),
    testTemplate = require('./test.hbs'),
    apiPrefix = 'http://localhost:4000/api/';

export default class ExampleApp {

    /**
     * Ensures that starting state has all sentences output.
     */
    constructor() {
        this.elements = {};
        this.elements.greeting = document.querySelector('.js-greeting');
        this.elements.language = document.querySelector('.js-select-language');
        this.elements.messageCount = document.querySelector('.js-message-count');
        this.elements.message = document.querySelector('.js-messages');
        this.elements.okAction = document.querySelector('.js-ok-action');
        this.elements.okStatement = document.querySelector('.js-ok-statement');
        this.elements.templateContainer = document.querySelector('.js-template-container');

        this.bindEvents();
        this.setGreeting();
        this.setMessage();
        this.setTemplate();
        this.setContextButtons();
    }

    /**
     * Setting up UI event listeners for application functionality.
     */
    bindEvents() {
        /**
         *  Whenever the language selection changes, trigger update
         *  logic to change accordingly.
         *
         *  @param {object} event - DOM Event.
         */
        this.elements.language.addEventListener('change', (event) => {
            var chosenValue = event.target.value;
            this.setLanguage(chosenValue);
        });

        /**
         *  Whenever the message count field is updated we trigger
         *  the logic to update the DOM.
         *
         *  @param {object} event - DOM Event.
         */
        this.elements.messageCount.addEventListener('keyup', (event) => {
            event.preventDefault();
            this.setMessage();
        });
    }

    /**
     *  Retrieves the language files that match the language code.
     *  Performs an API request for data if necessary.
     *
     *  @param {String} langCode - Two-letter language code.
     *  @return {Object} - Promise.
     */
    getTranslations(langCode) {
        return new Promise(function(resolve, reject) {
            if (i18nHelper.store.hasOwnProperty(langCode)) {
                resolve(i18nHelper.store[langCode]);
            } else {
                var ajax = new Ajax({
                    method: 'GET',
                    url: apiPrefix + 'translations/' + langCode
                });

                ajax.on('success', function(event, data) {
                    i18nHelper.store[langCode] = JSON.parse(data);
                    resolve(i18nHelper.store[langCode]);
                });

                ajax.on('error', function(event, data) {
                    reject(JSON.parse(data));
                });

                ajax.send();
            }
        });
    }

    /**
     * Updating the two buttons in the DOM with output from
     * `pgettext` which has the same translation key but in
     * different contexts.
     */
    setContextButtons() {
        this.elements.okAction.innerHTML = i18nHelper.i18n.pgettext('actions', 'OK');
        this.elements.okStatement.innerHTML = i18nHelper.i18n.pgettext('statements', 'OK');
    }

    /**
     *  Updates the DOM with the appropriate greeting.
     *  This demonstrates a standard translation via `gettext`.
     */
    setGreeting() {
        var greetingTranslation = i18nHelper.i18n.gettext('Hello world.');
        this.elements.greeting.innerHTML = greetingTranslation;
    }

    /**
     *  Applies the translation data to the i18n instance and
     *  then triggers an update of the greetings.
     *
     *  @param {String} langCode - Two-letter language code.
     */
    setLanguage(langCode) {
        var translationsRequest = this.getTranslations(langCode);

        translationsRequest.then(
            (data) => {
                i18nHelper.i18n = new i18nHelper.Jed(data);
                this.setGreeting();
                this.setMessage();
                this.setTemplate();
                this.setContextButtons();
            },
            (rawData) => {
                console.warn('Error', rawData);
                i18nHelper.i18n = new i18nHelper.Jed({});
                this.setGreeting();
                this.setMessage();
                this.setTemplate();
                this.setContextButtons();
            }
        );
    }

    /**
     *  Takes the message count and ensures its a numeric value. Uses
     *  `ngettext` to determine which message (singular or plural)
     *  should be used then uses `sprintf` to update the dynamic
     *  values within the statement. After this is all done, the
     *  DOM is updated.
     */
    setMessage() {
        var inputValue = this.elements.messageCount.value;
        inputValue = parseInt(inputValue.trim(), 10) || 0;

        var correctPluralTranslation = i18nHelper.i18n.ngettext(
            'You have %1$d new message.',
            'You have %1$d new messages.',
            inputValue
        );

        var variableReplacedTranslation = i18nHelper.Jed.sprintf(
            correctPluralTranslation,
            inputValue
        );

        this.elements.message.innerHTML = variableReplacedTranslation;
    }

    /**
     *  Updates the DOM with a handlebars template that outputs
     *  sentences via `gettext`, `ngettext` and `sprintf`.
     */
    setTemplate() {
        this.elements.templateContainer.innerHTML = testTemplate({
            total_people: 2,
            total_messages: 1
        });
    }

}

new ExampleApp();
