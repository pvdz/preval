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


## PST Settled
With rename=true

`````js filename=intro
$( 1, 2 );
$( 4, 2, 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let y = undefined;
let z = undefined;
const tmpArrAssignPatternRhs = [1, 2, 3];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
x = tmpArrPatternSplat[0];
y = tmpArrPatternSplat[1];
$(x, y);
const tmpArrAssignPatternRhs$1 = [4, 5, 6];
const tmpArrPatternSplat$1 = [...tmpArrAssignPatternRhs$1];
x = tmpArrPatternSplat$1[0];
z = tmpArrPatternSplat$1[1];
$(x, y, z);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
