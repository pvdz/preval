# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
++$($(b)).x + ++$($(b)).x;
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
const tmpCalleeParam$1 /*:unknown*/ = $(b);
const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 + 1;
tmpUpdObj$1.x = tmpUpdInc$1;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
tmpUpdObj.x = $coerce(tmpUpdObj.x, `number`) + 1;
const tmpUpdObj$1 = $($(b));
tmpUpdObj$1.x = $coerce(tmpUpdObj$1.x, `number`) + 1;
$({ a: 999, b: 1000 }, b);
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
const g = $( a );
const h = $( g );
const i = h.x;
const j = $coerce( i, "number" );
const k = j + 1;
h.x = k;
const l = {
  a: 999,
  b: 1000,
};
$( l, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(b);
const tmpUpdObj = $(tmpCalleeParam);
const tmpUpdProp = tmpUpdObj.x;
const tmpUpdNum = $coerce(tmpUpdProp, `number`);
const tmpUpdInc = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
const tmpBinBothLhs = tmpUpdInc;
let tmpCalleeParam$1 = $(b);
const tmpUpdObj$1 = $(tmpCalleeParam$1);
const tmpUpdProp$1 = tmpUpdObj$1.x;
const tmpUpdNum$1 = $coerce(tmpUpdProp$1, `number`);
const tmpUpdInc$1 = tmpUpdNum$1 + 1;
tmpUpdObj$1.x = tmpUpdInc$1;
const tmpBinBothRhs = tmpUpdInc$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '2' }
 - 4: { x: '2' }
 - 5: { a: '999', b: '1000' }, { x: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
