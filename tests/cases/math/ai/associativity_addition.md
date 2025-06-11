# Preval test case

# associativity_addition.md

> Math > Ai > Associativity addition
>
> Associativity of addition: (a + b) + c !== a + (b + c)

## Input

`````js filename=intro
const a = $(1e16);
const b = $(1);
const c = $(-1e16);
const x = (a + b) + c;
const y = a + (b + c);
$(x);
$(y);
// x should be 1, y should be 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10000000000000000);
const b /*:unknown*/ = $(1);
const c /*:unknown*/ = $(-10000000000000000);
const tmpBinLhs /*:primitive*/ = a + b;
const x /*:primitive*/ = tmpBinLhs + c;
const tmpBinBothRhs /*:primitive*/ = b + c;
const y /*:primitive*/ = a + tmpBinBothRhs;
$(x);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(10000000000000000);
const b = $(1);
const c = $(-10000000000000000);
const x = a + b + c;
const y = a + (b + c);
$(x);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10000000000000000 );
const b = $( 1 );
const c = $( -10000000000000000 );
const d = a + b;
const e = d + c;
const f = b + c;
const g = a + f;
$( e );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(10000000000000000);
const b = $(1);
const c = $(-10000000000000000);
const tmpBinLhs = a + b;
const x = tmpBinLhs + c;
const tmpBinBothLhs = a;
const tmpBinBothRhs = b + c;
const y = tmpBinBothLhs + tmpBinBothRhs;
$(x);
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10000000000000000
 - 2: 1
 - 3: -10000000000000000
 - 4: 0
 - 5: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
