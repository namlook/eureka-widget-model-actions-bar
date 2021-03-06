import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    classNames: ['presentation', 'pull-right'],

    actionConfig: null,
    model: null,
    currentRouteName: null,

    name: Ember.computed.alias('actionConfig.name'),

    iconCssClass: function() {
        var icon;

        if (this.get('isToggleAction')) {
            var currentState = this.get('currentToggleState');
            icon = this.get('actionConfig.toggle.'+currentState+'.icon');
        } else {
            icon = this.get('actionConfig.icon');
        }

        return icon;
    }.property('actionConfig.icon', 'isToggleAction', 'currentToggleState'),

    /** the label of the action to display
     * If the action is a toggle action, then the label to display
     * is the label of the current state
     */
    label: function() {
        var _label;

        // if the action is a toggle action, we use the label
        // from the current toggle state
        if (this.get('isToggleAction')) {
            var currentState = this.get('currentToggleState');
            _label = this.get('actionConfig.toggle.'+currentState+'.label');
        } else {
            var name = this.get('name');
            _label = this.get('actionConfig.label') || name;
        }

        return _label;
    }.property('actionConfig.label', 'name', 'isToggleAction', 'currentToggleState'),


    /** return the Ember route to tansit when the action is triggered
    */
    route: Ember.computed.alias('actionConfig.route'),


    /** return true if the route is equal to `currentRouteName`
     */
    isCurrentRoute: function() {
        return this.get('currentRouteName') === this.get('route');
    }.property('currentRouteName', 'route'),


    /** true if the action is a toggle action
     */
    isToggleAction: Ember.computed.notEmpty('actionConfig.toggle'),


    /** return the current state of the action
     */
    currentToggleState: function() {
        var fieldName = this.get('actionConfig.field');
        return this.get('model.'+fieldName);
    }.property('action.field', 'model._hasChanged'),


    /** toggle beetween the differents states of the action
     * The next state is specified in the `next` params:
     *
     *   {
     *       name: "toogledAction",
     *       field: "fieldName",
     *       toggle: {
     *           "firstState": {
     *               label: "label of the first state",
     *               next: "secondState"
     *           },
     *           "secondState": {
     *               label: "label of the second state",
     *               next: "firstState"
     *           }
     *       }
     *   }
     *
     */
    toggleValue: function() {
        var fieldName = this.get('actionConfig.field');
        var currentState = this.get('currentToggleState');
        var nextValue  = this.get('actionConfig.toggle.'+currentState+'.next');
        this.set('model.'+fieldName, nextValue);
        var model = this.get('model');
        model._triggerReloadFields();
        model.save().then(function() {
            console.log('saved');
        });
    },

    actions: {
        actionTriggered: function(actionName) {
            this.sendAction('toControllerAction', {
                name: actionName,
                payload: this.get('model')
            });
        },
        toggle: function() {
            this.toggleValue();
        }
    }

});
