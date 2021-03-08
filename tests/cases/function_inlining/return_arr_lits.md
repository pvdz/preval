# Preval test case

# return_arr_lits.md

> Function inlining > Return arr lits
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f() {
  return [10, 20, 30];
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpReturnArg = [10, 20, 30];
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [10, 20, 30];
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [10, 20, 30]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same