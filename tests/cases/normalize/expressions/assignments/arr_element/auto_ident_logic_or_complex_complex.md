# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) + (a = $($(0)) || $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) + (a = $($(0)) || $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpBinBothLhs = a;
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = $(0);
a = tmpCallCallee$5(tmpCalleeParam$5);
if (a) {
} else {
  const tmpCallCallee$7 = $;
  const tmpCalleeParam$7 = $(2);
  a = tmpCallCallee$7(tmpCalleeParam$7);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = $(0);
const a = $(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCalleeParam$3 = $(2);
  $(tmpCalleeParam$3);
}
const tmpCalleeParam$5 = $(0);
let tmpClusterSSA_a = $(tmpCalleeParam$5);
if (tmpClusterSSA_a) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpClusterSSA_a + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$7 = $(2);
  tmpClusterSSA_a = $(tmpCalleeParam$7);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpClusterSSA_a + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {

}
else {
  const c = $( 2 );
  $( c );
}
const d = $( 0 );
let e = $( d );
if (e) {
  const f = e + e;
  $( f );
}
else {
  const g = $( 2 );
  e = $( g );
  const h = e + e;
  $( h );
}
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 0
 - 6: 0
 - 7: 2
 - 8: 2
 - 9: 4
 - 10: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
