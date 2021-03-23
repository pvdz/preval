# Preval test case

# func_hoisting.md

> Normalize > Hoisting > Func > Func hoisting
>
> The result should be that the functions appear in lexicographical order

#TODO

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

## Output

`````js filename=intro
const a = function () {
  debugger;
};
const b = function () {
  debugger;
};
const d = function () {
  debugger;
};
const f = function () {
  debugger;
};
const h = function () {
  debugger;
};
const x = function () {
  debugger;
};
$(a, b, d, f, h, x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>', '<function>', '<function>', '<function>', '<function>', '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
