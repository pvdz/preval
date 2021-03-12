# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = (10, 20, 30) ? (40, 50, 60) : $($(100))) +
    (a = (10, 20, 30) ? (40, 50, 60) : $($(100)))
);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, 30) ? (40, 50, 60) : $($(100))) + (a = (10, 20, 30) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpBinBothLhs = a;
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  a = 60;
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(100);
  a = tmpCallCallee$2(tmpCalleeParam$2);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(120);
$(60);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 120
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
