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
const f = function (x, y) {
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
f(10, 20);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
