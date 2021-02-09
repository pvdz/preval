# Preval test case

# func_hoisting_order.md

> normalize > functions > func_hoisting_order
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
function a() {}
function b() {}
function d() {}
function f() {}
function h() {}
function l() {}
function x() {}
a();
$(a, b, d, f, h, x);
export { l };
export { h };
export { a };
`````

## Output

`````js filename=intro
function a() {}
function b() {}
function d() {}
function f() {}
function h() {}
function x() {}
$(a, b, d, f, h, x);
export { l };
export { h };
export { a };
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
