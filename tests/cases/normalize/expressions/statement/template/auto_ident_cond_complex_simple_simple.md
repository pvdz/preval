# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Template > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$(1) ? 2 : $($(100))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`before  2  after`);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_tmpCalleeParam$1, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ /*truthy*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`before  2  after`);
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
  $( "before  2  after" );
}
else {
  const b = $( 100 );
  const c = $( b );
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  $( e );
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
let tmpCalleeParam$1 = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCalleeParam$1 = 2;
} else {
  let tmpCalleeParam$3 = $(100);
  tmpCalleeParam$1 = $(tmpCalleeParam$3);
}
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
 - 1: 1
 - 2: 'before 2 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
