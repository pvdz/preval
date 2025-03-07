# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Template > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = ($($(1)) && $($(1))) || $($(2)))}  after`);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$3);
if (a) {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$5);
} else {
}
if (a) {
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$7 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$7);
  const tmpClusterSSA_tmpBinBothRhs$1 /*:string*/ = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam$1 /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs$1}  after`;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
}
if (a) {
  $(`before  ${a}  after`);
} else {
  a = $($(2));
  $(`before  ${a}  after`);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = ($($(1)) && $($(1))) || $($(2))), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpCalleeParam$3 = $(1);
a = $(tmpCalleeParam$3);
if (a) {
  const tmpCalleeParam$5 = $(1);
  a = $(tmpCalleeParam$5);
} else {
}
if (a) {
} else {
  const tmpCalleeParam$7 = $(2);
  a = $(tmpCalleeParam$7);
}
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
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
  b = $( f );
  const g = $coerce( b, "string" );
  const h = `before  ${g}  after`;
  $( h );
}
$( b );
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
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
