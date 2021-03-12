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
let a = function () {};
let b = function () {};
let d = function () {};
let f = function () {};
let h = function () {};
let l = function () {};
let x = function () {};
a();
$(a, b, d, f, h, x);
`````

## Normalized

`````js filename=intro
let a = function () {};
let b = function () {};
let d = function () {};
let f = function () {};
let h = function () {};
let l = function () {};
let x = function () {};
a();
$(a, b, d, f, h, x);
`````

## Output

`````js filename=intro
const a = function () {};
const b = function () {};
const d = function () {};
const f = function () {};
const h = function () {};
const x = function () {};
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
