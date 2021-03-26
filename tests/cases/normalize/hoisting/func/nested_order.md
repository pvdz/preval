# Preval test case

# nested_order.md

> Normalize > Hoisting > Func > Nested order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f());
function f() {
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
    const tmpReturnArg$3 = $();
    return tmpReturnArg$3;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f$1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$3 = h();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $();
const tmpCalleeParam$1 = $();
const tmpCalleeParam$3 = $();
$(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: undefined, undefined, undefined
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
