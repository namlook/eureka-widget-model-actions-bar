# Eureka-widget-model-actions-bar

An action bar for Eureka's models

    {
        type: 'model-actions-bar',
        actions: [
            { // regular action (you will have to implement the action into the controller)
                name: 'simpleAction', // the name of the triggered action
                label: 'simple action',
                icon: 'glyphicon glyphicon-pencil' // icon css classes
            },
            { // route transition action
                name: 'edit',
                route: 'user.model.edit' // the full ember route
            },
            { // toggle action
                name: 'toggleIsExtinct',
                field: 'isExtinct',
                toggle: {
                    true: {
                        label: 'set extinct',
                        next: false,
                    },
                    false: {
                        label: 'unextinct',
                        next: true
                    }
                }
            }
        ]
    }

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
