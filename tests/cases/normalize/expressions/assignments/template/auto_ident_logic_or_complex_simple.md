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
let a /*:unknown*/ = $(tmpCalleeParam$3);
if (a) {
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  a = 2;
  $(`before  2  after`);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
if (a) {
  $(`before  ${a}  after`);
} else {
  a = 2;
  $(`before  2  after`);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $($(0)) || 2), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpCalleeParam$3 = $(0);
a = $(tmpCalleeParam$3);
if (a) {
} else {
  a = 2;
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
const a = $( 0 );
let b = $( a );
if (b) {
  const c = $coerce( b, "string" );
  const d = `before  ${c}  after`;
  $( d );
}
else {
  b = 2;
  $( "before  2  after" );
}
$( b );
`````

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
