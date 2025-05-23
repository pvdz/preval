# Preval test case

# and_neq_0_false.md

> Bit hacks > And x if > And neq 0 false
>
> Meh

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 0; // false
$(z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(32768);
const y /*:number*/ = x & 32768;
const z /*:boolean*/ = $boolean_constructor(y);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor($(32768) & 32768));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32768 );
const b = a & 32768;
const c = $boolean_constructor( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 0;
$(z);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 32768
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
