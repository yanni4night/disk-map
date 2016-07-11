/**
 * Copyright (C) 2016 yanni4night.com
 * test.js
 *
 * changelog
 * 2016-07-11[14:36:45]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';

var assert = require('assert');
var util = require('util');
var _ = require('lodash');
var DiskMap = require('../');

var tickM = {};

function tick(tag) {
    tickM[tag] = _.extend({}, process.memoryUsage());
};

function tickEnd(tag) {
    var used = process.memoryUsage().heapUsed - tickM[tag].heapUsed;
    console.log('%s:%s bytes', tag, used);
    return used;
};

describe('DiskMap', function () {
    describe('set', function () {
        it('should save buffer to disk', function () {
            var dm = new DiskMap();
            var SIZE = 1024 * 1024 * 2;
            var payload = Buffer.alloc(SIZE);
            tick('2mb');
            dm.set('big buffer', payload);
            tickEnd('2mb');
        });
        it('should not save buffer to disk', function () {
            var dm = new DiskMap();
            var SIZE = 1024;
            var payload = Buffer.alloc(SIZE);
            tick('1kb');
            dm.set('big buffer', payload);
            tickEnd('1kb');
        });
        it('should not save buffer to disk', function () {
            var dm = new DiskMap({
                threshold: 1024 * 1024 * 5 /*5mb*/
            });
            var SIZE = 1024 * 1024 * 4;
            var payload = Buffer.alloc(SIZE).fill(67);
            tick('4mb');
            dm.set('big buffer', payload);
            tickEnd('4mb');
        });
    });
    describe('get', function () {
        it('should get string from disk', function () {
            var dm = new DiskMap({
                threshold: 10
            });
            var payload = 'Hello World, This is a nodejs program';
            dm.set('str', payload);
            assert.deepEqual(dm.get('str'), payload)
        });
        it('should get string from memory', function () {
            var dm = new DiskMap();
            var payload = 'Hello World, This is a nodejs program';
            dm.set('str', payload);
            assert.deepEqual(dm.get('str'), payload)
        });
        it('should get buffer from disk', function () {
            var dm = new DiskMap({
                threshold: 10
            });
            var SIZE = 1024 * 1024 * 2;
            var payload = Buffer.alloc(SIZE).fill(56);
            dm.set('buf', payload);
            assert.deepEqual(dm.get('buf'), payload);
        });
        it('should get buffer from memory', function () {
            var dm = new DiskMap();
            var SIZE = 1024
            var payload = Buffer.alloc(SIZE).fill(56);
            dm.set('buf', payload);
            assert.deepEqual(dm.get('buf'), payload);
        });
        it('could save other type', function () {
            var dm = new DiskMap();
            dm.set('global', global);
            assert.deepEqual(dm.get('global'), global);
            dm.set('Promise', Promise);
            assert.deepEqual(dm.get('Promise'), Promise);
            dm.set('NaN', NaN);
            assert.ok(isNaN(dm.get('NaN')));
        });

    });
    describe('has', function () {
        it('should return true', function () {
            var dm = new DiskMap();
            dm.set('x-y-a', undefined);
            assert.ok(dm.has('x-y-a'));
        });
    });
    describe('delete', function () {
        it('should remove it', function () {
            var dm = new DiskMap();
            dm.set('x-y-a', undefined);
            dm.delete('x-y-a');
            assert.ok(!dm.has('x-y-a'));
        });
    });

});