# Preval test case

# global_order.md

> Normalize > Hoisting > Func > Global order
>
> How do we normalize multiple func decls on the same level?

#TODO

## Input

`````js filename=intro
$(f(), g(), h());

function f() { return $(); }
function g() { return $(); }
function h() { return $(); }
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $();
};
let g = function () {
  return $();
};
let h = function () {
  return $();
};
$(f(), g(), h());
`````

## Normalized

`````js filename=intro
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
`````

## Output

`````js filename=intro
const tmpCalleeParam = $();
const tmpCalleeParam$1 = $();
const tmpCalleeParam$2 = $();
$(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: undefined, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
