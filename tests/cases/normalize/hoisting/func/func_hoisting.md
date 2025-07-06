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
const a /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const b /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const d /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const f /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const h /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const x /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$(a, b, d, f, h, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(
  function $pcompiled() {},
  function $pcompiled() {},
  function $pcompiled() {},
  function $pcompiled() {},
  function $pcompiled() {},
  function $pcompiled() {},
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
const b = function $pcompiled() {
  debugger;
  return undefined;
};
const c = function $pcompiled() {
  debugger;
  return undefined;
};
const d = function $pcompiled() {
  debugger;
  return undefined;
};
const e = function $pcompiled() {
  debugger;
  return undefined;
};
const f = function $pcompiled() {
  debugger;
  return undefined;
};
$( a, b, c, d, e, f );
`````


## Normalized
(This is what phase1 received the first time)

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


## Todos triggered


None


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
