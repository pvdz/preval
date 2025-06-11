# Preval test case

# date_arithmetic_coercion.md

> Math > Ai > Date arithmetic coercion
>
> Date arithmetic and implicit conversion

## Input

`````js filename=intro
const d = $(new Date(0));
const n = d - 0;
$(n);
// Should be 0
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:date*/ /*truthy*/ = new $date_constructor(0);
const d /*:unknown*/ = $(tmpCalleeParam);
const n /*:number*/ = d - 0;
$(n);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(new $date_constructor(0)) - 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $date_constructor( 0 );
const b = $( a );
const c = b - 0;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = new $date_constructor(0);
const d = $(tmpCalleeParam);
const n = d - 0;
$(n);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
