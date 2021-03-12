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
const f = function (x) {
  const tmpReturnArg = $(10);
  return tmpReturnArg;
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
