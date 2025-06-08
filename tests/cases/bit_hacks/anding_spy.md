# Preval test case

# anding_spy.md

> Bit hacks > Anding spy
>
> Two ands can be combined

## Input

`````js filename=intro
const x = $spy(1234);
const y = x & 200;
const z = y & 300;
$(x, y, z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(1234);
const y /*:number*/ /*&200*/ = x & 200;
const z /*:number*/ /*&8*/ /*oneBitAnded*/ = y & 8;
$(x, y, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy(1234);
const y = x & 200;
$(x, y, y & 8);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 1234 );
const b = a & 200;
const c = b & 8;
$( a, b, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(1234);
const y = x & 200;
const z = y & 300;
$(x, y, z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [1234, 1234]
 - 2: '$spy[1].valueOf()', 1234
 - 3: '<spy[1]>', 192, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
