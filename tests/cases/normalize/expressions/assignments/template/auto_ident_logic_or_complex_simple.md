# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(0)) || 2)}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam$3);
if (a) {
  const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
  const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  $(tmpCalleeParam);
  $(a);
} else {
  $(`before  2  after`);
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
if (a) {
  $(`before  ${a}  after`);
  $(a);
} else {
  $(`before  2  after`);
  $(2);
}
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
  $( b );
}
else {
  $( "before  2  after" );
  $( 2 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 'before 2 after'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
