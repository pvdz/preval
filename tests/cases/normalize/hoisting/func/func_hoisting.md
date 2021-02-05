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
('<hoisted func decl `x`>');
('<hoisted func decl `l`>');
('<hoisted func decl `b`>');
('<hoisted func decl `f`>');
('<hoisted func decl `h`>');
('<hoisted func decl `d`>');
('<hoisted func decl `a`>');
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
$(a, b, d, f, h, x);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
