# Preval test case

# var_pattern_for_regular_func_top.md

> Normalize > Hoisting > Base > Var pattern for regular func top
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
function f() {
  $(x);
  for (var [x] = [10];false;);
  $(x);
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  {
    [x] = [10];
    while (false) {}
  }
  $(x);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  const arrAssignPatternRhs = [10];
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
$(undefined);
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope