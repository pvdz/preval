# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Template > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${($($(1)) && $($(1))) || $($(2))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
let tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$5);
} else {
}
if (tmpCalleeParam$1) {
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$7 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$7);
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
let tmpCalleeParam$1 = $($(1));
if (tmpCalleeParam$1) {
  tmpCalleeParam$1 = $($(1));
}
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
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  const d = $coerce( b, "string" );
  const e = `before  ${d}  after`;
  $( e );
}
else {
  const f = $( 2 );
  const g = $( f );
  const h = $coerce( g, "string" );
  const i = `before  ${h}  after`;
  $( i );
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 'before 1 after'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
