# Preval test case

# nested_order.md

> Normalize > Hoisting > Exported func named > Nested order
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
let f = function () {
  let f$1 = function () {
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
  const tmpCalleeParam = f$1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
export { f };
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = $();
  const tmpCalleeParam$1 = $();
  const tmpCalleeParam$2 = $();
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
export { f };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
