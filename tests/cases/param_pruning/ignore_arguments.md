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

## Normalized

`````js filename=intro
let f = function (x, y, z) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpCallCallee = $;
  const tmpUnaryArg = !tmpPrevalAliasArgumentsAny;
  const tmpCalleeParam = !tmpUnaryArg;
  const tmpCalleeParam$1 = x;
  const tmpCalleeParam$2 = z;
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return tmpReturnArg;
};
f();
`````

## Output

`````js filename=intro
const f = function (x, y, z) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpUnaryArg = !tmpPrevalAliasArgumentsAny;
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

Normalized calls: Same

Final output calls: Same
