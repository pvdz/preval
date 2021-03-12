# Preval test case

# nested_order.md

> Normalize > Hoisting > Exported func default anon > Nested order
>
> How do we normalize multiple func decls on the same level?

#TODO

## Input

`````js filename=intro
$(1);
export default function() {
  $(f(), g(), h());
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Normalized

`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  let f = function () {
    const tmpReturnArg = $();
    return tmpReturnArg;
  };
  let g = function () {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  };
  let h = function () {
    const tmpReturnArg$2 = $();
    return tmpReturnArg$2;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
};
export { tmpAnonDefaultExport as default };
`````

## Output

`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  const f = function () {
    const tmpReturnArg = $();
    return tmpReturnArg;
  };
  const g = function () {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  };
  const h = function () {
    const tmpReturnArg$2 = $();
    return tmpReturnArg$2;
  };
  const tmpCalleeParam = f();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
};
export { tmpAnonDefaultExport as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
