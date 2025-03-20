# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
throw (a = ++$($(b)).x);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
throw tmpUpdInc;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUpdObj = $($({ x: 1 }));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
tmpUpdObj.x = tmpUpdInc;
throw tmpUpdInc;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e + 1;
c.x = f;
throw f;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
