# Preval test case

# nested_order.md

> normalize > hoisting > func > nested_order
>
> How do we normalize multiple func decls on the same level?

#TODO

## Input

`````js filename=intro
$(f());
export function f() {
  $(f(), g(), h());
    
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Normalized

`````js filename=intro
export function f() {
  function f_1() {
    const tmpReturnArg = $();
    return tmpReturnArg;
  }
  function g() {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
  function h() {
    const tmpReturnArg$2 = $();
    return tmpReturnArg$2;
  }
  const tmpCallCallee = $;
  const tmpCalleeParam = f_1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  ('<hoisted func decl `f`>');
  ('<hoisted func decl `g`>');
  ('<hoisted func decl `h`>');
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
('<hoisted func decl `f`>');
`````

## Output

`````js filename=intro
export function f() {
  function f_1() {
    const tmpReturnArg = $();
    return tmpReturnArg;
  }
  function g() {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
  function h() {
    const tmpReturnArg$2 = $();
    return tmpReturnArg$2;
  }
  const tmpCallCallee = $;
  const tmpCalleeParam = f_1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
