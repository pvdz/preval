# Preval test case

# var_pattern_for_regular_global_block.md

> Normalize > Hoisting > Base > Var pattern for regular global block
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
$(x);
{
  for (var [x] = [10];false;);
}
$(x);
`````

## Settled


`````js filename=intro
$(undefined);
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(10);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(x);
{
  {
    [x] = [10];
    while (false) {}
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
$(x);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope