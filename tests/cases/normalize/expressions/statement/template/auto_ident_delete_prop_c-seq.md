# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Template > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${delete ($(1), $(2), $(arg)).y}  after`);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpFree /*:(boolean)=>string*/ = function $free($$0) {
  const tmpCalleeParam$2 /*:boolean*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$2, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpCalleeParam$1 /*:boolean*/ = delete tmpDeleteObj.y;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, tmpCalleeParam$1);
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpCalleeParam$2) {
  const tmpRet = `before  ${tmpCalleeParam$2}  after`;
  return tmpRet;
};
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
$($frfr(tmpFree, delete tmpDeleteObj.y));
$({ a: 999, b: 1000 }, arg);
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
$( 1 );
$( 2 );
const f = { y: 1 };
const g = $( f );
const h = delete g.y;
const i = j( a, h );
$( i );
const k = {
  a: 999,
  b: 1000,
};
$( k, f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
$(1);
$(2);
const tmpDeleteObj = $(arg);
let tmpCalleeParam$1 = delete tmpDeleteObj.y;
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'before true after'
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
