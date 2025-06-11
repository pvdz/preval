# Preval test case

# math_destructuring.md

> Math > Ai > Math destructuring
>
> Destructuring assignment from Math results

## Input

`````js filename=intro
const [a, b] = [Math.floor(1.9), Math.ceil(1.1)];
$(a);
$(b);
// Should be 1, 2
`````


## Settled


`````js filename=intro
$(1);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_floor;
const tmpArrElement = 1;
const tmpMCF$1 = $Math_ceil;
const tmpArrElement$1 = 2;
const tmpBindingPatternArrRoot = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const a = tmpArrPatternSplat[0];
const b = tmpArrPatternSplat[1];
$(a);
$(b);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
