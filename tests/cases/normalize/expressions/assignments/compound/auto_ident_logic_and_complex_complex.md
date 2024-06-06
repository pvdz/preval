# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(1)) && $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(1)) && $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpBinBothRhs = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpBinBothRhs = $(tmpCalleeParam$1);
let tmpClusterSSA_a = undefined;
const a = { a: 999, b: 1000 };
if (tmpBinBothRhs) {
  const tmpCalleeParam$3 = $(2);
  const tmpClusterSSA_tmpBinBothRhs = $(tmpCalleeParam$3);
  tmpClusterSSA_a = a * tmpClusterSSA_tmpBinBothRhs;
  $(tmpClusterSSA_a);
} else {
  tmpClusterSSA_a = a * tmpBinBothRhs;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
let c = undefined;
const d = {
a: 999,
b: 1000
;
if (b) {
  const e = $( 2 );
  const f = $( e );
  c = d * f;
  $( c );
}
else {
  c = d * b;
  $( c );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: NaN
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
