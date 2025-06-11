# Preval test case

# numeric_separator_parsing.md

> Math > Ai > Numeric separator parsing
>
> Numeric separator parsing

## Input

`````js filename=intro
const a = $(1_000_000_000_000_001);
const b = $(1000000000000001);
$(a === b);
// Should be true
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1000000000000001);
const b /*:unknown*/ = $(1000000000000001);
const tmpCalleeParam /*:boolean*/ = a === b;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1000000000000001);
$(a === $(1000000000000001));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1000000000000001 );
const b = $( 1000000000000001 );
const c = a === b;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(1000000000000001);
const b = $(1000000000000001);
let tmpCalleeParam = a === b;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1000000000000001
 - 2: 1000000000000001
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
