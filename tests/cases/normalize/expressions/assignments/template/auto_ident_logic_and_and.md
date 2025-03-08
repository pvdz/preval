# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Template > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(1)) && $($(1)) && $($(2)))}  after`);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$3);
if (a) {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$5);
  if (a) {
    const tmpCalleeParam$7 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$7);
  } else {
  }
} else {
}
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
  if (a) {
    a = $($(2));
  }
}
$(`before  ${a}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $($(1)) && $($(1)) && $($(2))), `string`) + `  after`);
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
  if (a) {
    const tmpCalleeParam$7 = $(2);
    a = $(tmpCalleeParam$7);
  } else {
  }
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
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
const e = $coerce( b, "string" );
const f = `before  ${e}  after`;
$( f );
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
 - 5: 2
 - 6: 2
 - 7: 'before 2 after'
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
