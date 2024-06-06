# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $($(1)) && 2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $($(1)) && 2));
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
  a = 2;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam$1 = $(1);
let a = $(tmpCalleeParam$1);
if (a) {
  a = 2;
  const tmpClusterSSA_tmpCalleeParam = tmpBinBothLhs + 2;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 = tmpBinBothLhs + a;
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
  c = 2;
  const d = a + 2;
  $( d );
}
else {
  const e = a + c;
  $( e );
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
 - 4: 102
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
