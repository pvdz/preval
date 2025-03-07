# Preval test case

# double_pattern.md

> Normalize > Hoisting > Var > Double pattern
>
> Silly case of a double var pattern binding

## Input

`````js filename=intro
var [x, y] = [1, 2, 3];
$(x,y);
var [x, y] = [4, 5, 6];
$(x,y);
`````

## Settled


`````js filename=intro
$(1, 2);
$(4, 5);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 2);
$(4, 5);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
let y = undefined;
[x, y] = [1, 2, 3];
$(x, y);
[x, y] = [4, 5, 6];
$(x, y);
`````

## Normalized


`````js filename=intro
let x = undefined;
let y = undefined;
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
$(x, y);
const arrAssignPatternRhs$1 = [4, 5, 6];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
x = arrPatternSplat$1[0];
y = arrPatternSplat$1[1];
$(x, y);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1, 2 );
$( 4, 5 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 2
 - 2: 4, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope