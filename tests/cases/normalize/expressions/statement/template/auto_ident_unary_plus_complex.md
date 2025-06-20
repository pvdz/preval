# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Statement > Template > Auto ident unary plus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${+$(100)}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const tmpCalleeParam$2 /*:number*/ = $$0;
  debugger;
  const tmpStringConcatL /*:string*/ = $coerce(tmpCalleeParam$2, `string`);
  const tmpRet /*:string*/ /*truthy*/ = `before  ${tmpStringConcatL}  after`;
  return tmpRet;
};
const tmpUnaryArg /*:unknown*/ = $(100);
const tmpCalleeParam$1 /*:number*/ = +tmpUnaryArg;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, tmpCalleeParam$1);
$(tmpCalleeParam);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpCalleeParam$2) {
  const tmpRet = `before  ${tmpCalleeParam$2}  after`;
  return tmpRet;
};
const tmpUnaryArg = $(100);
$($frfr(tmpFree, +tmpUnaryArg));
$({ a: 999, b: 1000 });
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
const f = $( 100 );
const g = +f;
const h = i( a, g );
$( h );
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpUnaryArg = $(100);
let tmpCalleeParam$1 = +tmpUnaryArg;
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'before 100 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
