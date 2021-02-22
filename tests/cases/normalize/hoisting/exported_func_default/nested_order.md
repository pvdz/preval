# Preval test case

# nested_order.md

> Normalize > Hoisting > Exported func default > Nested order
>
> How do we normalize multiple func decls on the same level?

#TODO

## Input

`````js filename=intro
$(f());
export default function f() {
  $(f(), g(), h());

  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Normalized

`````js filename=intro
function f() {
  function f$1() {
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
  const tmpCalleeParam = f$1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
export { f as default };
`````

## Output

`````js filename=intro
function f() {
  function f$1() {
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
  const tmpCalleeParam = f$1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
}
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
export { f as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
