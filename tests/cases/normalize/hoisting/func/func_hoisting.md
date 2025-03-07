# Preval test case

# func_hoisting.md

> Normalize > Hoisting > Func > Func hoisting
>
> The result should be that the functions appear in lexicographical order

## Input

`````js filename=intro
a();

function x(){}
function l(){}
function b(){}
function f(){}
function h(){}
function d(){}
function a(){}

$(a,b,d,f,h,x);
`````

## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const b /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const d /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const h /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const x /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(a, b, d, f, h, x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(
  function () {},
  function () {},
  function () {},
  function () {},
  function () {},
  function () {},
);
`````

## Pre Normal


`````js filename=intro
let a = function () {
  debugger;
};
let b = function () {
  debugger;
};
let d = function () {
  debugger;
};
let f = function () {
  debugger;
};
let h = function () {
  debugger;
};
let l = function () {
  debugger;
};
let x = function () {
  debugger;
};
a();
$(a, b, d, f, h, x);
`````

## Normalized


`````js filename=intro
let a = function () {
  debugger;
  return undefined;
};
let b = function () {
  debugger;
  return undefined;
};
let d = function () {
  debugger;
  return undefined;
};
let f = function () {
  debugger;
  return undefined;
};
let h = function () {
  debugger;
  return undefined;
};
let l = function () {
  debugger;
  return undefined;
};
let x = function () {
  debugger;
  return undefined;
};
a();
$(a, b, d, f, h, x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = function() {
  debugger;
  return undefined;
};
const c = function() {
  debugger;
  return undefined;
};
const d = function() {
  debugger;
  return undefined;
};
const e = function() {
  debugger;
  return undefined;
};
const f = function() {
  debugger;
  return undefined;
};
$( a, b, c, d, e, f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>', '<function>', '<function>', '<function>', '<function>', '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
