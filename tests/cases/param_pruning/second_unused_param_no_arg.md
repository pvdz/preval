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

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  return $(x);
};
f();
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
f();
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
