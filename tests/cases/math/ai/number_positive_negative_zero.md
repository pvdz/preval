# Preval test case

# number_positive_negative_zero.md

> Math > Ai > Number positive negative zero
>
> +0 and -0 in arithmetic and comparison

## Input

`````js filename=intro
const a = $(+0);
const b = $(-0);
const c = 1 / a;
const d = 1 / b;
$(a === b);
$(c);
$(d);
// Should be true, Infinity, -Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const b /*:unknown*/ = $(-0);
const c /*:number*/ = 1 / a;
const d /*:number*/ = 1 / b;
const tmpCalleeParam$1 /*:boolean*/ = a === b;
$(tmpCalleeParam$1);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(0);
const b = $(-0);
const c = 1 / a;
const d = 1 / b;
$(a === b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( -0 );
const c = 1 / a;
const d = 1 / b;
const e = a === b;
$( e );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 0;
const a = $(tmpCalleeParam);
const b = $(-0);
const c = 1 / a;
const d = 1 / b;
let tmpCalleeParam$1 = a === b;
$(tmpCalleeParam$1);
$(c);
$(d);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: true
 - 4: Infinity
 - 5: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
