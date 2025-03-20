# Preval test case

# partial_double_pattern.md

> Normalize > Hoisting > Var > Partial double pattern
>
> Silly case of a double var pattern binding

## Input

`````js filename=intro
var [x, y] = [1, 2, 3];
$(x,y);
var [x, z] = [4, 5, 6];
$(x, y, z);
`````

## Settled


`````js filename=intro
$(1, 2);
$(4, 2, 5);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 2);
$(4, 2, 5);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
let y = undefined;
let z = undefined;
[x, y] = [1, 2, 3];
$(x, y);
[x, z] = [4, 5, 6];
$(x, y, z);
`````

## Normalized


`````js filename=intro
let x = undefined;
let y = undefined;
let z = undefined;
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
$(x, y);
const arrAssignPatternRhs$1 = [4, 5, 6];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
x = arrPatternSplat$1[0];
z = arrPatternSplat$1[1];
$(x, y, z);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1, 2 );
$( 4, 2, 5 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 2
 - 2: 4, 2, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
