# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpBinBothRhs = $(2);
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
let tmpBinBothRhs = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpBinBothRhs = $(2);
} else {
  const tmpCalleeParam$1 = $(100);
  tmpBinBothRhs = $(tmpCalleeParam$1);
}
const a = { a: 999, b: 1000 };
const tmpClusterSSA_a = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
