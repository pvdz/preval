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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return [10, 20, 30];
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = [10, 20, 30];
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpReturnArg = [10, 20, 30];
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
