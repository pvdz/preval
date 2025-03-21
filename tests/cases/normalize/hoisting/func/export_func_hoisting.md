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
const l /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const x /*:()=>unknown*/ = function () {
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
const a = function () {};
const b = function () {};
const d = function () {};
const f = function () {};
const h = function () {};
const l = function () {};
$(a, b, d, f, h, function () {});
export { l };
export { h };
export { a };
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
const g = function() {
  debugger;
  return undefined;
};
$( a, b, c, d, e, g );
export { f as l };
export { e as h };
export { a as a };
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
