# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Template > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${++$($(b)).x}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const tmpUpdInc$1 /*:number*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(tmpUpdInc$1, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$3 /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$3);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, tmpUpdInc);
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpUpdInc$1) {
  const tmpRet = `before  ${tmpUpdInc$1}  after`;
  return tmpRet;
};
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
tmpUpdObj.x = tmpUpdInc;
$($frfr(tmpFree, tmpUpdInc));
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  return e;
};
const f = { x: 1 };
const g = $( f );
const h = $( g );
const i = h.x;
const j = $coerce( i, "number" );
const k = j + 1;
h.x = k;
const l = m( a, k );
$( l );
const n = {
  a: 999,
  b: 1000,
};
$( n, f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'before 2 after'
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
