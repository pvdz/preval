# Preval test case

# and_eq_n_true.md

> Bit hacks > And x if > And eq n true
>
> Meh

## Input

`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y === 32768; // false
$(z);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const x /*:number*/ = +tmpUnaryArg;
const y /*:number*/ = x & 32768;
const z /*:boolean*/ = Boolean(y);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
$(Boolean(+tmpUnaryArg & 32768));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = +a;
const c = b & 32768;
const d = Boolean( c );
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
