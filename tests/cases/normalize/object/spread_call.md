# Preval test case

# spread_call.md

> Normalize > Object > Spread call
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
function f(){
  return $({x: 1});
}
$({...f()});
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: 1 };
const tmpObjSpread /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$1 /*:object*/ = { ...tmpObjSpread };
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpread = $({ x: 1 });
$({ ...tmpObjSpread });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = { ... b };
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
