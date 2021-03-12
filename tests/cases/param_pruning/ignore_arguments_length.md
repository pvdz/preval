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

## Normalized

`````js filename=intro
let f = function (x, y, z) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpReturnArg = $(tmpPrevalAliasArgumentsLen, x, z);
  return tmpReturnArg;
};
f();
`````

## Output

`````js filename=intro
const f = function (x, y, z) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpReturnArg = $(tmpPrevalAliasArgumentsLen, x, z);
  return tmpReturnArg;
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0, undefined, undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
