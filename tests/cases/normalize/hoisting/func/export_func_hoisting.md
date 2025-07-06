# Preval test case

# export_func_hoisting.md

> Normalize > Hoisting > Func > Export func hoisting
>
> The result should be that the functions appear in lexicographical order

## Input

`````js filename=intro
a();

function x(){}
export function l(){}
function b(){}
function f(){}
export function h(){}
function d(){}
export function a(){}

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
const l /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const x /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$(a, b, d, f, h, x);
export { l };
export { h };
export { a };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function $pcompiled() {};
const b = function $pcompiled() {};
const d = function $pcompiled() {};
const f = function $pcompiled() {};
const h = function $pcompiled() {};
const l = function $pcompiled() {};
$(a, b, d, f, h, function $pcompiled() {});
export { l };
export { h };
export { a };
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
const g = function $pcompiled() {
  debugger;
  return undefined;
};
$( a, b, c, d, e, g );
export { f as l };
export { e as h };
export { a as a };
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
export { l };
export { h };
export { a };
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
