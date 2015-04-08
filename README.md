# Terminology
* `gettext` - Internationalizes a chosen string.
* `ngettext` - A plural version of `gettext` which uses an integer to determine whether or not to use a singular or plural version of a sentence.
* `sprintf` - Formats a string and replaces placeholders with variables.

# Usage

## Extracting strings into `.pot` files
Ideally we will have English references to our translations dotted throughout our client-side code base. These references could be found in JavaScript source files as well as templating library files such as `.hbs` files.

We are able to extract all of these strings and generate a `.pot` file from them. This is done via a module known as `JSPot`. It is intelligent enough to know the difference between a standard 1:1 translation and one with plurals, ensuring the `.pot` file is output correctly.

Use the command below to generate the `.pot` file:

```node_modules/.bin/jspot extract --target=./locales ./js/src/main.js```

## Creating `.po` catalogues from the `.pot` template

Using an editor such as `POEdit`, create a new catalog from `.pot file` and ensure you set the plural form to be the correct value for the language you're about to be translating. You can find a list of plural forms [here](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms) which should be of help. After this is done, fill out and save your `.po` file as required, placing it into the same directory as the `.pot` file but named after the languages two letter code.

NOTE: If you are using POEdit and are creating a catalog for the first time you may find it best to add the plural form **after** the initial setup screen. Sometimes if the plural form is input during the first setup screen it doesn't work correctly.

## Converting `.po` catalogues into `.json` catalogues

The Jed library used for i18n is unable to directly read a `.po` file so it must be converted into Jed-compatible `.json` format. This is done via a module known as `po2json` and can be run with the following command:

```gulp po2json```

## Using the API

To serve the `.json` catalogues to the front-end, an API has been made to retrieve them. Ensure it is running before trying out this demo. It can be run with the following command:

```node api/index.js```