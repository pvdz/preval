# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = --$($(b)).x)}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const tmpUpdInc$1 /*:number*/ = $$0;
  debugger;
  const tmpStringConcatL /*:string*/ = $coerce(tmpUpdInc$1, `string`);
  const tmpRet /*:string*/ = `before  ${tmpStringConcatL}  after`;
  return tmpRet;
};
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$3 /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$3);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, tmpUpdInc);
$(tmpCalleeParam);
$(tmpUpdInc, b);
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
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) - 1;
tmpUpdObj.x = tmpUpdInc;
$($frfr(tmpFree, tmpUpdInc));
$(tmpUpdInc, b);
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
const k = j - 1;
h.x = k;
const l = m( a, k );
$( l );
$( k, f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
let tmpCalleeParam$3 = $(b);
const tmpUpdObj = $(tmpCalleeParam$3);
const tmpUpdProp = tmpUpdObj.x;
const tmpUpdNum = $coerce(tmpUpdProp, `number`);
const tmpUpdInc = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
a = tmpUpdInc;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
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
 - 3: 'before 0 after'
 - 4: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
