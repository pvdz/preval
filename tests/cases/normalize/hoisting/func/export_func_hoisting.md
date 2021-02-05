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
export function a() {}
function b() {}
function d() {}
function f() {}
export function h() {}
export function l() {}
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
export function a() {}
function b() {}
function d() {}
function f() {}
export function h() {}
export function l() {}
function x() {}
$(a, b, d, f, h, x);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
