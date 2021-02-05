# Preval test case

# global_order.md

> normalize > hoisting > func > global_order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f(), g(), h());

export function f() { return $(); }
export function h() { return $(); }
export function g() { return $(); }
`````

## Normalized

`````js filename=intro
export function f() {
  const tmpReturnArg = $();
  return tmpReturnArg;
}
export function g() {
  const tmpReturnArg$1 = $();
  return tmpReturnArg$1;
}
export function h() {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
const tmpCalleeParam$2 = h();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
('<hoisted func decl `f`>');
('<hoisted func decl `h`>');
('<hoisted func decl `g`>');
`````

## Output

`````js filename=intro
export function f() {
  const tmpReturnArg = $();
  return tmpReturnArg;
}
export function g() {
  const tmpReturnArg$1 = $();
  return tmpReturnArg$1;
}
export function h() {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
const tmpCalleeParam$2 = h();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
