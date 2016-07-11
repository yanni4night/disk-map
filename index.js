/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-07-11[13:21:33]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';

var tmp = require('tmp');
var fs = require('fs');
var _ = require('lodash');
var defineFrozenProperty = require('define-frozen-property');

/**
 * Class reprenseting a DiskMap.
 */
function DiskMap(options) {
    this.options = _.extend({
        threshold: 1024 * 1024 // 1Mb
    }, options);

    defineFrozenProperty(this, '_map', {});
}

_.extend(DiskMap.prototype, {
    set: function (key, value) {
        var fdObj;
        if (Buffer.isBuffer(value)) {
            if (value.length >= this.options.threshold) {
                fdObj = tmp.fileSync();
                fs.writeSync(fdObj.fd, value, 0, value.length);
                this._map[key] = {
                    type: 'buffer',
                    fd: fdObj.fd
                };
            } else {
                this._map[key] = {
                    type: 'buffer',
                    value: Buffer.from(value)
                };
            }
        } else if (_.isString(value)) {
            if (Buffer.byteLength(value) >= this.options.threshold) {
                fdObj = tmp.fileSync();
                var buf = Buffer.from(value);
                fs.writeSync(fdObj.fd, buf, 0, buf.length);
                this._map[key] = {
                    type: 'string',
                    fd: fdObj.fd
                };
            } else {
                this._map[key] = {
                    type: 'string',
                    value: value
                };
            }
        } else {
            this._map[key] = {
                type: 'raw',
                value: value
            };
        }

        return this;
    },
    get: function (key) {
        if (!(key in this._map)) {
            return undefined;
        }

        var saved = this._map[key];

        if ('value' in saved) {
            return saved.value;
        } else if ('fd' in saved) {
            var buf = Buffer.alloc(fs.fstatSync(saved.fd).size);
            fs.readSync(saved.fd, buf, 0, buf.length, 0);
            if ('string' === saved.type) {
                return buf.toString('utf8');
            } else if ('buffer' === saved.type) {
                return buf;
            } else {
                throw new Error('Neither "string" nor "buffer" is the type');
            }
        } else {
            throw new Error('Neither "value" nor "fd" exists');
        }
    },
    has: function (key) {
        return key in this._map;
    },
    delete: function (key) {
        return delete this._map[key];
    }
});

module.exports = DiskMap;