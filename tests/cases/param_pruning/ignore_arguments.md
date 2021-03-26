# Preval test case

# ignore_arguments.md

> Param pruning > Ignore arguments
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x, y, z) {
  return $(!!arguments, x, z);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpArgumentsAny = arguments;
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  return $(!!tmpArgumentsAny, x, z);
};
f();
`````

## Normalized

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpArgumentsAny = arguments;
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  const tmpCallCallee = $;
  const tmpUnaryArg = !tmpArgumentsAny;
  const tmpCalleeParam = !tmpUnaryArg;
  const tmpCalleeParam$1 = x;
  const tmpCalleeParam$3 = z;
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return tmpReturnArg;
};
f();
`````

## Output

`````js filename=intro
const f = function ($$0, $$1, $$2) {
  const tmpArgumentsAny = arguments;
  const x = $$0;
  const z = $$2;
  debugger;
  const tmpUnaryArg = !tmpArgumentsAny;
  const tmpCalleeParam = !tmpUnaryArg;
  const tmpReturnArg = $(tmpCalleeParam, x, z);
  return tmpReturnArg;
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
