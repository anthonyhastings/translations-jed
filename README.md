# Usage

## Extracting strings into `.pot` files
This is done via `JSpot` whose options can be seen with the following command:
```node_modules/.bin/jspot extract --help```

The command that should be used is as follows:
```node_modules/.bin/jspot extract --keyword=i18n --target=./locales ./js/src/*.js ./js/src/*.hbs```




### Plural Form
`nplurals=2; plural=(n > 1);`
NOTE: May need to update catalogue settings live... POEdit gets confused and doesn't show you translations sometimes.



### Converting `.po` catalogs into `.json` catalogs

```gulp po2json```




### Using the API

```node api/index.js```



`ngettext` determines singular or plural sentence. Examine the .pot file to see how it happens.


`sprintf` is replacing dynamic values within the chosen sentence.