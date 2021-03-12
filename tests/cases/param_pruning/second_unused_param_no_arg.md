# Preval test case

# second_unused_param_no_arg.md

> Param pruning > Second unused param no arg
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x, y) {
  return $(x);
}
f();
`````

## Normalized

`````js filename=intro
let f = function (x, y) {
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
f();
`````

## Output

`````js filename=intro
const f = function (x, y) {
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
