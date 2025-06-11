# Preval test case

# math_exp_log_inverse.md

> Math > Ai > Math exp log inverse
>
> Math.exp and Math.log as inverses

## Input

`````js filename=intro
const a = $(Math.exp(1));
const b = $(Math.log(a));
const c = $(Math.exp(0));
const d = $(Math.log(1));
$(a);
$(b);
$(c);
$(d);
// Should be Math.E, 1, 1, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2.718281828459045);
const tmpCalleeParam$1 /*:number*/ = $Math_log(a);
const b /*:unknown*/ = $(tmpCalleeParam$1);
const c /*:unknown*/ = $(1);
const d /*:unknown*/ = $(0);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(2.718281828459045);
const b = $($Math_log(a));
const c = $(1);
const d = $(0);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2.718281828459045 );
const b = $Math_log( a );
const c = $( b );
const d = $( 1 );
const e = $( 0 );
$( a );
$( c );
$( d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_exp;
let tmpCalleeParam = 2.718281828459045;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_log;
let tmpCalleeParam$1 = $Math_log(a);
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_exp;
let tmpCalleeParam$3 = 1;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_log;
let tmpCalleeParam$5 = 0;
const d = $(tmpCalleeParam$5);
$(a);
$(b);
$(c);
$(d);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.718281828459045
 - 2: 1
 - 3: 1
 - 4: 0
 - 5: 2.718281828459045
 - 6: 1
 - 7: 1
 - 8: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
