import Ember from 'ember';
import WidgetModel from 'ember-eureka/widget-model';

export default WidgetModel.extend({
    tagName: 'ul',
    classNames: ['nav', 'nav-pills'],
    currentRouteName: Ember.computed.alias('application.currentRouteName'),

    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(action) {
            this.sendAction('toControllerAction', action);
        }
    },
});