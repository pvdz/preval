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
let a /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`before  60  after`);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$3);
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 60;
if ($(1)) {
  $(`before  60  after`);
} else {
  a = $($(100));
  $(`before  ${a}  after`);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $(1) ? (40, 50, 60) : $($(100))), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$3 = $(100);
  a = $(tmpCalleeParam$3);
}
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 60;
const b = $( 1 );
if (b) {
  $( "before  60  after" );
}
else {
  const c = $( 100 );
  a = $( c );
  const d = $coerce( a, "string" );
  const e = `before  ${d}  after`;
  $( e );
}
$( a );
`````

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
