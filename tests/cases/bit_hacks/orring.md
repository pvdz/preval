# Preval test case

# orring.md

> Bit hacks > Orring
>
> Two ors can be combined

## Input

`````js filename=intro
const x = $(1234);
const y = x | 200;
const z = y | 300;
$(x, y, z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1234);
const y /*:number*/ /*truthy*/ /*|200*/ = x | 200;
const z /*:number*/ /*truthy*/ /*|300*/ = y | 300;
$(x, y, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1234);
const y = x | 200;
$(x, y, y | 300);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1234 );
const b = a | 200;
const c = b | 300;
$( a, b, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1234);
const y = x | 200;
const z = y | 300;
$(x, y, z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1234
 - 2: 1234, 1242, 1534
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
