# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Template > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$(1) ? (40, 50, $(60)) : $($(100))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(60);
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_tmpCalleeParam$1, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParam$2 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpClusterSSA_tmpBinBothRhs$1 /*:string*/ = $coerce(tmpClusterSSA_tmpCalleeParam$2, `string`);
  const tmpClusterSSA_tmpCalleeParam$3 /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs$1}  after`;
  $(tmpClusterSSA_tmpCalleeParam$3);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`before  ${$(60)}  after`);
} else {
  $(`before  ${$($(100))}  after`);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 60 );
  const c = $coerce( b, "string" );
  const d = `before  ${c}  after`;
  $( d );
}
else {
  const e = $( 100 );
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 'before 60 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
