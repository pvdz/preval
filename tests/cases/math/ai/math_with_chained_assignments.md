# Preval test case

# math_with_chained_assignments.md

> Math > Ai > Math with chained assignments
>
> Chained assignments with Math

## Input

`````js filename=intro
let a, b, c;
a = b = c = Math.sqrt(49);
$(a);
$(b);
$(c);
// Should all be 7
`````


## Settled


`````js filename=intro
$(7);
$(7);
$(7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(7);
$(7);
$(7);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 7 );
$( 7 );
$( 7 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
const tmpMCF = $Math_sqrt;
c = 7;
const tmpNestedComplexRhs = c;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
$(tmpNestedComplexRhs);
$(b);
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7
 - 2: 7
 - 3: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
