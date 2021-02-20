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
function a() {}
function b() {}
function d() {}
function f() {}
function h() {}
function x() {}
a();
$(a, b, d, f, h, x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function', 'function', 'function', 'function', 'function', 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
