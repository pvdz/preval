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

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let f$1 = function () {
    debugger;
    return $();
  };
  let g = function () {
    debugger;
    return $();
  };
  let h = function () {
    debugger;
    return $();
  };
  $(f$1(), g(), h());
};
$(f());
export { f as default };
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let f$1 = function () {
    debugger;
    const tmpReturnArg = $();
    return tmpReturnArg;
  };
  let g = function () {
    debugger;
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  };
  let h = function () {
    debugger;
    const tmpReturnArg$2 = $();
    return tmpReturnArg$2;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f$1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
export { f as default };
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $();
  const tmpCalleeParam$1 = $();
  const tmpCalleeParam$2 = $();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
export { f as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
