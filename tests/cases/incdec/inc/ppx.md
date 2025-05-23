# Preval test case

# ppx.md

> Incdec > Inc > Ppx
>
>

## Input

`````js filename=intro
let x = $(0);
let y = ++x;
$(y);
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(0);
const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
const tmpClusterSSA_x /*:number*/ = tmpPostUpdArgIdent + 1;
$(tmpClusterSSA_x);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_x = $coerce($(0), `number`) + 1;
$(tmpClusterSSA_x);
$(tmpClusterSSA_x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $coerce( a, "number" );
const c = b + 1;
$( c );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(0);
const tmpPostUpdArgIdent = $coerce(x, `number`);
x = tmpPostUpdArgIdent + 1;
let y = x;
$(x);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
