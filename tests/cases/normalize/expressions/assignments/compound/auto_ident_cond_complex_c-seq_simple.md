# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpBinBothRhs = $(60);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
let tmpClusterSSA_a = undefined;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpBinBothRhs = $(60);
  tmpClusterSSA_a = a * tmpClusterSSA_tmpBinBothRhs;
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$1 = $(100);
  const tmpClusterSSA_tmpBinBothRhs$1 = $(tmpCalleeParam$1);
  tmpClusterSSA_a = a * tmpClusterSSA_tmpBinBothRhs$1;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = undefined;
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  const d = $( 60 );
  b = c * d;
  $( b );
}
else {
  const e = $( 100 );
  const f = $( e );
  b = c * f;
  $( b );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
