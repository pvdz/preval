# Preval test case

# one_unused_param_with_one_arg.md

> Param pruning > One unused param with one arg
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x) {
  return $(10);
}
f(10);
`````

## Normalized

`````js filename=intro
let f = function (x) {
  const tmpReturnArg = $(10);
  return tmpReturnArg;
};
f(10);
`````

## Output

`````js filename=intro
const f = function (x) {
  const tmpReturnArg = $(10);
  return tmpReturnArg;
};
f(10);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
