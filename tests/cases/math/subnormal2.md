# Preval test case

# subnormal2.md

> Math > Subnormal2
>
> Subnormal numbers are those very close to zero, where the precision is even lower.

## Input

`````js filename=intro
const a = $(5e-324); // Smallest positive subnormal
const b = $(4e-324); // Underflows to 0
$(a === 0); // false
$(b === 0); // true
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(5e-324);
const b /*:unknown*/ = $(5e-324);
const tmpCalleeParam /*:boolean*/ = a === 0;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = b === 0;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(5e-324);
const b = $(5e-324);
$(a === 0);
$(b === 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5e-324 );
const b = $( 5e-324 );
const c = a === 0;
$( c );
const d = b === 0;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(5e-324);
const b = $(5e-324);
let tmpCalleeParam = a === 0;
$(tmpCalleeParam);
let tmpCalleeParam$1 = b === 0;
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5e-324
 - 2: 5e-324
 - 3: false
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
