# Preval test case

# second_unused_param_with_two_args.md

> Param pruning > Second unused param with two args
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x, y) {
  return $(x);
}
f(10, 20);
`````

## Pre Normal

`````js filename=intro
let f = function (x, y) {
  return $(x);
};
f(10, 20);
`````

## Normalized

`````js filename=intro
let f = function (x, y) {
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
f(10, 20);
`````

## Output

`````js filename=intro
$(10);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
