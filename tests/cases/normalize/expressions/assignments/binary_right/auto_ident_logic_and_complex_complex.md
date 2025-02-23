# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $($(1)) && $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $($(1)) && $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$3);
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + a;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 1 );
let c = $( b );
if (c) {
  const d = $( 2 );
  c = $( d );
  const e = a + c;
  $( e );
}
else {
  const f = a + c;
  $( f );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: 102
 - 7: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
