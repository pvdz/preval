# Preval test case

# export_func_hoisting.md

> Normalize > Hoisting > Func > Export func hoisting
>
> The result should be that the functions appear in lexicographical order

#TODO

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
export { l };
export { h };
export { a };
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
export { l };
export { h };
export { a };
`````

## Output

`````js filename=intro
const a = function () {
  debugger;
  return undefined;
};
const b = function () {
  debugger;
  return undefined;
};
const d = function () {
  debugger;
  return undefined;
};
const f = function () {
  debugger;
  return undefined;
};
const h = function () {
  debugger;
  return undefined;
};
const l = function () {
  debugger;
  return undefined;
};
const x = function () {
  debugger;
  return undefined;
};
$(a, b, d, f, h, x);
export { l };
export { h };
export { a };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
