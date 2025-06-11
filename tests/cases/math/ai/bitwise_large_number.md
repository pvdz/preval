# Preval test case

# bitwise_large_number.md

> Math > Ai > Bitwise large number
>
> Bitwise operation on large number

## Input

`````js filename=intro
const a = $(0x1fffffffffffff); // 2^53-1
const b = a | 0;
$(b);
// Should be -1 (32-bit signed int)
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(9007199254740991);
const b /*:number*/ /*|0*/ = a | 0;
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(9007199254740991) | 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 9007199254740991 );
const b = a | 0;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(9007199254740991);
const b = a | 0;
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 9007199254740991
 - 2: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
