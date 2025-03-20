# Preval test case

# xpp.md

> Incdec > Dec > Xpp
>
>

## Input

`````js filename=intro
let x = $(0);
let y = x--;
$(y);
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(0);
const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
$(tmpPostUpdArgIdent);
const tmpClusterSSA_x /*:number*/ = tmpPostUpdArgIdent - 1;
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpPostUpdArgIdent = $coerce($(0), `number`);
$(tmpPostUpdArgIdent);
$(tmpPostUpdArgIdent - 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $coerce( a, "number" );
$( b );
const c = b - 1;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
