# Preval test case

# neg_zero.md

> Math > Neg zero
>
> JavaScript distinguishes -0 and 0, but many systems do not.

## Input

`````js filename=intro
const a = $(-0);
const b = $(0);
$(1 / a); // -Infinity
$(1 / b); // Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(-0);
const b /*:unknown*/ = $(0);
const tmpCalleeParam /*:number*/ = 1 / a;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = 1 / b;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(-0);
const b = $(0);
$(1 / a);
$(1 / b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( -0 );
const b = $( 0 );
const c = 1 / a;
$( c );
const d = 1 / b;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(-0);
const b = $(0);
let tmpCalleeParam = 1 / a;
$(tmpCalleeParam);
let tmpCalleeParam$1 = 1 / b;
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: -Infinity
 - 4: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
