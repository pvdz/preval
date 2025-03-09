# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(1)) && $($(2)))}  after`);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam$3);
if (a) {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$5);
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_a, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_tmpBinBothRhs$1 /*:string*/ = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam$1 /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs$1}  after`;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
if (a) {
  const tmpClusterSSA_a = $($(2));
  $(`before  ${tmpClusterSSA_a}  after`);
  $(tmpClusterSSA_a);
} else {
  $(`before  ${a}  after`);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $($(1)) && $($(2))), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpCalleeParam$3 = $(1);
a = $(tmpCalleeParam$3);
if (a) {
  const tmpCalleeParam$5 = $(2);
  a = $(tmpCalleeParam$5);
} else {
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
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  const d = $( c );
  const e = $coerce( d, "string" );
  const f = `before  ${e}  after`;
  $( f );
  $( d );
}
else {
  const g = $coerce( b, "string" );
  const h = `before  ${g}  after`;
  $( h );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 'before 2 after'
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
