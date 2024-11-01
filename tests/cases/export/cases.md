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

## Pre Normal


`````js filename=intro
let c = undefined;
let f = function () {
  debugger;
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
};
export { tmpAnonDefaultExport as default };
export { c };
export { f };
`````

## Normalized


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

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
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
const tmpAnonDefaultExport /*:()=>*/ = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
const c /*:number*/ = 3;
export { c };
export { f };
`````

## PST Output

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

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same