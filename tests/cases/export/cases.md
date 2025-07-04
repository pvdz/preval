# Preval test case

# cases.md

> Export > Cases
>
> Various cases

## Input

`````js filename=intro
export let a = 1;
export const b = 2; 
export var c = 3;
export function f() {}
export class X {}

let g = 1;
export {g};

let h = 2;
export {h as i};

export default function(){};
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const a /*:number*/ /*truthy*/ = 1;
export { a };
const b /*:number*/ /*truthy*/ = 2;
export { b };
const X /*:class*/ /*truthy*/ = class {};
export { X };
const g /*:number*/ /*truthy*/ = 1;
export { g };
const h /*:number*/ /*truthy*/ = 2;
export { h as i };
const tmpAnonDefaultExport /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
const c /*:number*/ /*truthy*/ = 3;
export { c };
export { f };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function $pcompiled() {};
const a = 1;
export { a };
const b = 2;
export { b };
const X = class {};
export { X };
const g = 1;
export { g };
const h = 2;
export { h as i };
const tmpAnonDefaultExport = function $pcompiled() {};
export { tmpAnonDefaultExport as default };
const c = 3;
export { c };
export { f };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
const c = 1;
export { c as a };
const d = 2;
export { d as b };
const e = class   {

};
export { e as X };
const f = 1;
export { f as g };
const g = 2;
export { g as i };
const h = function b() {
  debugger;
  return undefined;
};
export { h as default };
const i = 3;
export { i as c };
export { a as f };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = undefined;
let f = function () {
  debugger;
  return undefined;
};
let a = 1;
export { a };
const b = 2;
export { b };
c = 3;
let X = class {};
export { X };
let g = 1;
export { g };
let h = 2;
export { h as i };
const tmpAnonDefaultExport = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
export { c };
export { f };
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
