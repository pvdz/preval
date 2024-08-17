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
const c = 3;
const f = function () {
  debugger;
  return undefined;
};
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
const tmpAnonDefaultExport = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
export { c };
export { f };
`````

## PST Output

With rename=true

`````js filename=intro
const a = 3;
const b = function() {
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
const h = function() {
  debugger;
  return undefined;
};
export { h as default };
export { a as c };
export { b as f };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
