# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident upd im complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(100) + $($(b)).x--;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
tmpBinBothLhs + 0;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const b = { x: 1 };
const tmpUpdObj = $($(b));
tmpUpdObj.x = $coerce(tmpUpdObj.x, `number`) - 1;
tmpBinBothLhs + 0;
$({ a: 999, b: 1000 }, b);
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
const g = f - 1;
d.x = g;
a + 0;
const h = {
  a: 999,
  b: 1000,
};
$( h, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
let tmpCalleeParam = $(b);
const tmpUpdObj = $(tmpCalleeParam);
const tmpUpdProp = tmpUpdObj.x;
const tmpUpdNum = $coerce(tmpUpdProp, `number`);
const tmpUpdInc = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
const tmpBinBothRhs = tmpUpdNum;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
