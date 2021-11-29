
# Australian postcode validator in react
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It was edited on 3 separate machines running Windows 10, MacOS and Ubuntu 18.04 (depending on which machine I am working on during the day).

p.s. on Ubuntu, you may encounter an error with respect to 'watchers' when executing npm start. Have a look at this link to [resolve npm watchers error]


### Instructions
- clone the Github repo on the command line 
- run 'npm install'
- run 'node corsProxy' (in a new terminal tab)
- run 'npm start' (in the original tab)

### Summary
Open 2 terminal tabs, 1. -> for npm start and 2. -> for node corsProxy

# Reference material 
* [Intro to React] - To learn some React concepts
* [Ajax and APIs] - To know more about using fetch
* [CORS Error 1] - A github repo on building proxy to avoid CORS
* [CORS Error 2] - Another github repo on avoiding CORS

[Intro to React]:  https://reactjs.org/tutorial/tutorial.html
[Ajax and APIs]: https://reactjs.org/docs/faq-ajax.html
[CORS Error 1]: https://github.com/ccoenraets/cors-proxy/blob/master/server.js
[CORS Error 2]: https://github.com/jonathansee2013/Postcode-Validator
[resolve npm watchers error]: https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details

# More great tutorials and code samples
Checkout [this blog] for more "how-to" code samples, tutorials and just info on how to solve problems.

If you like what I am doing, you can [buy me a coffee]

Click on the next link for more info on the 13+ year [software engineering career journey] of the author.

[this blog]: https://mydaytodo.com/blog/
[buy me a coffee]: https://www.buymeacoffee.com/bhumansoni
## TODO
- We don't need to have a separate proxy, we can just do it [in one line, like this]
- important!!! What if there's no internet connection? we don't handle that situation gracefully here
- the code for fetching, processing data and matching suburbs looks confusing, clean up
- too much code in one page, modularise it? maybe use the Angular services equivalent for react
- using standard 'alert' dialogs, maybe use a better css styled proper dialog box

[in one line, like this]:https://create-react-app.dev/docs/proxying-api-requests-in-development/

This was the first time, I built anything in React, so be gentle and Happy hacking :)
