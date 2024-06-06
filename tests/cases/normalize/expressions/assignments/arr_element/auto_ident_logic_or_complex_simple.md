# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) + (a = $($(0)) || 2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) + (a = $($(0)) || 2));
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
  a = 2;
}
let tmpBinBothLhs = a;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(0);
a = tmpCallCallee$3(tmpCalleeParam$3);
if (a) {
} else {
  a = 2;
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
let tmpBinBothLhs = 2;
if (a) {
  tmpBinBothLhs = a;
} else {
}
const tmpCalleeParam$3 = $(0);
let tmpClusterSSA_a = $(tmpCalleeParam$3);
if (tmpClusterSSA_a) {
  const tmpClusterSSA_tmpCalleeParam = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  tmpClusterSSA_a = 2;
  const tmpClusterSSA_tmpCalleeParam$1 = tmpBinBothLhs + 2;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
let c = 2;
if (b) {
  c = b;
}
const d = $( 0 );
let e = $( d );
if (e) {
  const f = c + e;
  $( f );
}
else {
  e = 2;
  const g = c + 2;
  $( g );
}
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 4
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
