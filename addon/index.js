import Ember from 'ember';
import ModelWidget from 'ember-eureka/model-widget';

export default ModelWidget.extend({
    currentRouteName: Ember.computed.alias('application.currentRouteName'),

    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(action) {
            this.sendAction('toControllerAction', action);
        }
    },
});