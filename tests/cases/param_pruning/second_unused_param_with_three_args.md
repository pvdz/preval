# Preval test case

# second_unused_param_with_three_args.md

> Param pruning > Second unused param with three args
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x, y) {
  return $(x);
}
f(10, 20, 30);
`````

## Normalized

`````js filename=intro
let f = function (x, y) {
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
f(10, 20, 30);
`````

## Output

`````js filename=intro
const f = function (x, y) {
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
f(10, 20, 30);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
