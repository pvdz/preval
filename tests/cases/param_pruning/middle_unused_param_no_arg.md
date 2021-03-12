# Preval test case

# middle_unused_param_no_arg.md

> Param pruning > Middle unused param no arg
>
> Unused parameters should be eliminated under certain conditions, but not always.

#TODO

## Input

`````js filename=intro
function f(x, y, z) {
  return $(x, z);
}
f();
`````

## Normalized

`````js filename=intro
let f = function (x, y, z) {
  const tmpReturnArg = $(x, z);
  return tmpReturnArg;
};
f();
`````

## Output

`````js filename=intro
$(undefined, undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined, undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same