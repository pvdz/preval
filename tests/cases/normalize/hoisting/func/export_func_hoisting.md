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
export { l };
export { h };
export { a };
`````

## Output

`````js filename=intro
const a = function () {};
const b = function () {};
const d = function () {};
const f = function () {};
const h = function () {};
const l = function () {};
const x = function () {};
a();
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

Normalized calls: Same

Final output calls: Same
