# Preval test case

# math_sinh_cosh_tanh.md

> Math > Ai > Math sinh cosh tanh
>
> Math.sinh, Math.cosh, Math.tanh with positive, negative, and zero values

## Input

`````js filename=intro
const a = $(Math.sinh(0));
const b = $(Math.sinh(1));
const c = $(Math.cosh(0));
const d = $(Math.cosh(1));
const e = $(Math.tanh(0));
const f = $(Math.tanh(1));
$(a);
$(b);
$(c);
$(d);
$(e);
$(f);
// Should be 0, sinh(1), 1, cosh(1), 0, tanh(1)
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const b /*:unknown*/ = $(1.1752011936438014);
const c /*:unknown*/ = $(1);
const d /*:unknown*/ = $(1.5430806348152437);
const e /*:unknown*/ = $(0);
const f /*:unknown*/ = $(0.7615941559557649);
$(a);
$(b);
$(c);
$(d);
$(e);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(0);
const b = $(1.1752011936438014);
const c = $(1);
const d = $(1.5430806348152437);
const e = $(0);
const f = $(0.7615941559557649);
$(a);
$(b);
$(c);
$(d);
$(e);
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( 1.1752011936438014 );
const c = $( 1 );
const d = $( 1.5430806348152437 );
const e = $( 0 );
const f = $( 0.7615941559557649 );
$( a );
$( b );
$( c );
$( d );
$( e );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_sinh;
let tmpCalleeParam = 0;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_sinh;
let tmpCalleeParam$1 = 1.1752011936438014;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_cosh;
let tmpCalleeParam$3 = 1;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_cosh;
let tmpCalleeParam$5 = 1.5430806348152437;
const d = $(tmpCalleeParam$5);
const tmpMCF$7 = $Math_tanh;
let tmpCalleeParam$7 = 0;
const e = $(tmpCalleeParam$7);
const tmpMCF$9 = $Math_tanh;
let tmpCalleeParam$9 = 0.7615941559557649;
const f = $(tmpCalleeParam$9);
$(a);
$(b);
$(c);
$(d);
$(e);
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1.1752011936438014
 - 3: 1
 - 4: 1.5430806348152437
 - 5: 0
 - 6: 0.7615941559557649
 - 7: 0
 - 8: 1.1752011936438014
 - 9: 1
 - 10: 1.5430806348152437
 - 11: 0
 - 12: 0.7615941559557649
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
