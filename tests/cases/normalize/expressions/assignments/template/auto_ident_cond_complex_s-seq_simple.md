# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $(1) ? (40, 50, 60) : $($(100)))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`before  60  after`);
  $(60);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  const a /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
  const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  $(tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`before  60  after`);
  $(60);
} else {
  const a = $($(100));
  $(`before  ${a}  after`);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "before  60  after" );
  $( 60 );
}
else {
  const b = $( 100 );
  const c = $( b );
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  $( e );
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'before 60 after'
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
