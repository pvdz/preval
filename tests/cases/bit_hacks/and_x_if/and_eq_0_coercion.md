# Preval test case

# and_eq_0_coercion.md

> Bit hacks > And x if > And eq 0 coercion
>
> Meh

## Input

`````js filename=intro
const x = $('32768');
const y = x & 32768; // (coercion)
const z = y === 0 // false
$(z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`32768`);
const y /*:number*/ = x & 32768;
const z /*:boolean*/ = !y;
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(`32768`) & 32768;
$(!y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "32768" );
const b = a & 32768;
const c = !b;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '32768'
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
