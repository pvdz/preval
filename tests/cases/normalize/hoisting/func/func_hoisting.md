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
function l(){}
function b(){}
function f(){}
function h(){}
function d(){}
function a(){}

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
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'function', 'function', 'function', 'function', 'function', 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
