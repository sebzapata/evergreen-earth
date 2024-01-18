"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const world = "world";
function hello(who = world) {
    console.log(`Hello ${who}! `);
}
exports.hello = hello;
hello();
