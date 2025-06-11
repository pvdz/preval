# Preval test case

# parseint_radix_edge.md

> Math > Ai > Parseint radix edge
>
> parseInt with various radix values and edge cases

## Input

`````js filename=intro
const a = $(parseInt("11", 2));
const b = $(parseInt("11", 8));
const c = $(parseInt("11", 10));
const d = $(parseInt("11", 16));
const e = $(parseInt("xyz", 36));
$(a);
$(b);
$(c);
$(d);
$(e);
// Should be 3, 9, 11, 17, 44027
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(3);
const b /*:unknown*/ = $(9);
const c /*:unknown*/ = $(11);
const d /*:unknown*/ = $(17);
const e /*:unknown*/ = $(44027);
$(a);
$(b);
$(c);
$(d);
$(e);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(3);
const b = $(9);
const c = $(11);
const d = $(17);
const e = $(44027);
$(a);
$(b);
$(c);
$(d);
$(e);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 9 );
const c = $( 11 );
const d = $( 17 );
const e = $( 44027 );
$( a );
$( b );
$( c );
$( d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 3;
const a = $(tmpCalleeParam);
let tmpCalleeParam$1 = 9;
const b = $(tmpCalleeParam$1);
let tmpCalleeParam$3 = 11;
const c = $(tmpCalleeParam$3);
let tmpCalleeParam$5 = 17;
const d = $(tmpCalleeParam$5);
let tmpCalleeParam$7 = 44027;
const e = $(tmpCalleeParam$7);
$(a);
$(b);
$(c);
$(d);
$(e);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 9
 - 3: 11
 - 4: 17
 - 5: 44027
 - 6: 3
 - 7: 9
 - 8: 11
 - 9: 17
 - 10: 44027
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
