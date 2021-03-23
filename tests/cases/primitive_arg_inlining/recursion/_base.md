# Preval test case

# _base.md

> Primitive arg inlining > Recursion > Base
>
> Recursion problems

#TODO

## Options

- cloneLimit=5

## Input

`````js filename=intro
function f(n) {
  return f(n + 1);
}
$(f(0));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  return f(n + 1);
};
$(f(0));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  const tmpCallCallee = f;
  const tmpCalleeParam = n + 1;
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(0);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const n = $$0;
  debugger;
  const tmpCalleeParam = n + 1;
  const tmpReturnArg = f(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpReturnArg$1 = f(5);
$(tmpReturnArg$1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
