# Preval test case

# bitset.md

> Bit hacks > Bitset
>
> Testing if one specific bit is set

## Input

`````js filename=intro
const x = $(1234);
const y = x & 2;
const z = y === 2;
$(x, y, z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1234);
const y /*:number*/ /*&2*/ /*oneBitAnded*/ = x & 2;
const z /*:boolean*/ = $boolean_constructor(y);
$(x, y, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1234);
const y = x & 2;
$(x, y, $boolean_constructor(y));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1234 );
const b = a & 2;
const c = $boolean_constructor( b );
$( a, b, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1234);
const y = x & 2;
const z = y === 2;
$(x, y, z);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1234
 - 2: 1234, 2, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
