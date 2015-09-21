# Terminology
* `gettext` - Translates a chosen string.
* `ngettext` - A plural version of `gettext` which uses an integer to determine whether or not to use a singular or plural version of a translation.
* `sprintf` - Formats a string and replaces placeholders with variables.

# Usage

## Extracting strings into a `.pot` file
Ideally we will have English references to our translations dotted throughout our client-side code base. These references could be found in JavaScript source files as well as template files such as `.hbs` files.

We are able to extract all of these strings and generate a `.pot` file from them. This is done via a module known as `JSPot`. It is intelligent enough to know the difference between a standard 1:1 translation and a translation with plurals, ensuring the `.pot` file is output correctly. I have written a wrapper method which will traverse all `.js` and `.hbs` source files.

```gulp extract2pot```

## Creating `.po` catalogues from the `.pot` file

Using an editor such as `POEdit`, create a new catalog from the `.pot` file and ensure you set the plural form to be the correct value for the language you're about to be translating. You can find a list of plural forms [here](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms) which should be of help. After this is done, fill out and save your `.po` file as required, placing it into the same directory as the `.pot` file but named after the languages two letter code.

NOTE: If you are using POEdit and are creating a catalog for the first time you may find it best to add the plural form **after** the initial setup screen. Sometimes if the plural form is input during the first setup screen it doesn't work correctly.

## Converting `.po` catalogues into `.json` catalogues

The library is unable to directly read a `.po` file so it must be converted into Jed-compatible `.json` format. This is done via a module known as `po2json` and can be run with the following command:

```gulp po2json```

## Running the application

To run the application, run the following:

```
gulp build;
gulp server;
```

You will also (in a separate thread / terminal) need to run the API which acts as a file server to serve the `.json` catalogues. Ensure it is running before trying out this demo. It can be run with the following command (from inside `./api/`):

```
cd api;
node index.js
```
