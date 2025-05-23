# Preval test case

# and_neq_n_false.md

> Bit hacks > And x if > And neq n false
>
> Meh

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 32768; // false
$(z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(32768);
const y /*:number*/ = x & 32768;
const z /*:boolean*/ = !y;
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(32768) & 32768;
$(!y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32768 );
const b = a & 32768;
const c = !b;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 32768;
$(z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 32768
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
