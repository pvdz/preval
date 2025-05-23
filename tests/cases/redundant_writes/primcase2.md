# Preval test case

# primcase2.md

> Redundant writes > Primcase2
>
> Normalization of all kinds of expressions should work the same no matter where they are

This case surfaced an issue where the final rule could not outline a statement that
was actually a primitive.
This is the input where the core change happened. But it wouldn't trigger from this test.

## Input

`````js filename=intro
const tmpFree/*:(string)=>string*/ = function $free($$0) {
  const tmpBinBothRhs$1/*:string*/ = $$0;
  debugger;
  tmpBinBothRhs$1;
  const tmpBinLhs/*:string*/ = `before  ${tmpBinBothRhs$1}`;
  const tmpRet/*:string*/ = `${tmpBinLhs}  after`;
  return tmpRet;
};
const tmpCalleeParam$3/*:unknown*/ = $(0);
const tmpCalleeParam$1/*:unknown*/ = $(tmpCalleeParam$3);
let tmpBinBothRhs/*:string*/ = ``;
let tmpCalleeParam/*:primitive*/ = undefined;
if (tmpCalleeParam$1) {
  tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
  tmpCalleeParam = $frfr(tmpFree, tmpBinBothRhs);
} else {
  const tmpCalleeParam$5/*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParam$1/*:unknown*/ = $(tmpCalleeParam$5);
  tmpBinBothRhs = $coerce(tmpClusterSSA_tmpCalleeParam$1, `string`);
  tmpCalleeParam = $frfr(tmpFree, tmpBinBothRhs);
}
;
$(tmpCalleeParam);
const a/*:object*/ = {a:999, b:1000};
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(0);
const tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$5);
  const tmpClusterSSA_tmpBinBothRhs$1 /*:string*/ = $coerce(tmpClusterSSA_tmpCalleeParam$1, `string`);
  const tmpClusterSSA_tmpCalleeParam$2 /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs$1}  after`;
  $(tmpClusterSSA_tmpCalleeParam$2);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $($(0));
if (tmpCalleeParam$1) {
  $(`before  ${tmpCalleeParam$1}  after`);
} else {
  $(`before  ${$($(2))}  after`);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  const c = $coerce( b, "string" );
  const d = `before  ${c}  after`;
  $( d );
}
else {
  const e = $( 2 );
  const f = $( e );
  const g = $coerce( f, "string" );
  const h = `before  ${g}  after`;
  $( h );
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 'before 2 after'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
