# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = ++$($(b)).x));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$1 /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$1);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpUpdInc;
$(tmpCalleeParam);
$(tmpUpdInc, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
tmpUpdObj.x = tmpUpdInc;
$(tmpBinBothLhs + tmpUpdInc);
$(tmpUpdInc, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
const c = $( b );
const d = $( c );
const e = d.x;
const f = $coerce( e, "number" );
const g = f + 1;
d.x = g;
const h = a + g;
$( h );
$( g, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 102
 - 5: 2, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
