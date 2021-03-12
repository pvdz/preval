# Preval test case

# one_unused_param_with_two_args.md

> Param pruning > One unused param with two args
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x) {
  return $(10);
}
f(10, 20);
`````

## Normalized

`````js filename=intro
let f = function (x) {
  const tmpReturnArg = $(10);
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

Normalized calls: Same

Final output calls: Same
