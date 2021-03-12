# Preval test case

# one_unused_param_no_arg.md

> Param pruning > One unused param no arg
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x) {
  return $(10);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function (x) {
  return $(10);
};
f();
`````

## Normalized

`````js filename=intro
let f = function (x) {
  const tmpReturnArg = $(10);
  return tmpReturnArg;
};
f();
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
