# Preval test case

# import_should_keep.md

> Normalize > Naming > Import should keep
>
> The exported names are "observable" so their name should remain the same after the normalization step, at least.

## Input

`````js filename=intro
export function f() {
  // This x binding would cause the export to get a different 
  // unique name if we don't guard against that case
  let x = $(1);
  return x;
}
export function g(x) {
  return x;
}
export class c {}
export const x = $(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x$1 = $(1);
  return x$1;
};
let g = function ($$0) {
  let x$3 = $$0;
  debugger;
  return x$3;
};
let c = class {};
export { c };
const x = $(f());
export { x };
export { f };
export { g };
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x$1 = $(1);
  return x$1;
};
let g = function ($$0) {
  let x$3 = $$0;
  debugger;
  return x$3;
};
let c = class {};
export { c };
const tmpCallCallee = $;
const tmpCalleeParam = f();
const x = tmpCallCallee(tmpCalleeParam);
export { x };
export { f };
export { g };
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const x$1 = $(1);
  return x$1;
};
const g = function ($$0) {
  const x$3 = $$0;
  debugger;
  return x$3;
};
const c = class {};
export { c };
const tmpCalleeParam = $(1);
const x = $(tmpCalleeParam);
export { x };
export { f };
export { g };
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  return b;
};
const c = function($$0 ) {
  const d = e;
  debugger;
  return d;
};
const f = class   {

};
export { f as c from "undefined"
const g = $( 1 );
const h = $( g );
export { h as x from "undefined"
export { a as f from "undefined"
export { c as g from "undefined"
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
