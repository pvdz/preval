# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $(1) ? (40, 50, 60) : $($(100))) + (a = $(1) ? (40, 50, 60) : $($(100)))
);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? (40, 50, 60) : $($(100))) + (a = $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpBinBothLhs = a;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = 60;
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(100);
  a = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
const tmpBinBothLhs = a;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = 60;
} else {
  const tmpCalleeParam$3 = $(100);
  a = $(tmpCalleeParam$3);
}
const tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 120
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
