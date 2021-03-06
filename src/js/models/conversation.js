'use strict';

var Backbone = require('backbone');
var urljoin = require('url-join');

var BaseModel = require('./baseModel');
var AppMaker = require('./appMaker');
var AppUser = require('./appUser');
var Messages = require('../collections/messages');

module.exports = BaseModel.extend({
    idAttribute: '_id',
    urlRoot: 'conversations/',

    defaults: function() {
        return {
            unread: 0,
            messages: [],
            appUsers: [],
            appMakers: []
        };
    },

    relations: [
        {
            type: Backbone.Many,
            key: 'messages',
            collectionType: function() {
                var model = this;
                return Messages.extend({
                    url: function() {
                        return urljoin(model.url(), '/messages/');
                    }
                });
            }
        },
        {
            type: Backbone.Many,
            key: 'appMakers',
            relatedModel: AppMaker
        },
        {
            type: Backbone.Many,
            key: 'appUsers',
            relatedModel: AppUser
        }
    ]
});
