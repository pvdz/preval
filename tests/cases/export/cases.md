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
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const a /*:number*/ = 1;
export { a };
const b /*:number*/ = 2;
export { b };
const X /*:class*/ = class {};
export { X };
const g /*:number*/ = 1;
export { g };
const h /*:number*/ = 2;
export { h as i };
const tmpAnonDefaultExport /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
const c /*:number*/ = 3;
export { c };
export { f };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
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
const tmpAnonDefaultExport = function () {};
export { tmpAnonDefaultExport as default };
const c = 3;
export { c };
export { f };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = 1;
export { b as a };
const c = 2;
export { c as b };
const d = class   {

};
export { d as X };
const e = 1;
export { e as g };
const f = 2;
export { f as i };
const g = function() {
  debugger;
  return undefined;
};
export { g as default };
const h = 3;
export { h as c };
export { a as f };
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
