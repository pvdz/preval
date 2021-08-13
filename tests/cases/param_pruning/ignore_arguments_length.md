# Preval test case

# ignore_arguments_length.md

> Param pruning > Ignore arguments length
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x, y, z) {
  return $(arguments.length, x, z);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  return $(tmpPrevalAliasArgumentsLen, x, z);
};
f();
`````

## Normalized

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  const tmpReturnArg = $(tmpPrevalAliasArgumentsLen, x, z);
  return tmpReturnArg;
};
f();
`````

## Output

`````js filename=intro
$(0, undefined, undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
