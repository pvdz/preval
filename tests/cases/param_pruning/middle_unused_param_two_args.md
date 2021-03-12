# Preval test case

# middle_unused_param_two_args.md

> Param pruning > Middle unused param two args
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x, y, z) {
  return $(x, z);
}
f(10, 20);
`````

## Pre Normal

`````js filename=intro
let f = function (x, y, z) {
  return $(x, z);
};
f(10, 20);
`````

## Normalized

`````js filename=intro
let f = function (x, y, z) {
  const tmpReturnArg = $(x, z);
  return tmpReturnArg;
};
f(10, 20);
`````

## Output

`````js filename=intro
$(10, undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
