# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Arr element > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || ($($(1)) && $($(2)))) + ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || ($($(1)) && $($(2)))) + ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpBinBothLhs = tmpCallCallee(tmpCalleeParam);
if (tmpBinBothLhs) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpBinBothLhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpBinBothLhs) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpBinBothLhs = tmpCallCallee$2(tmpCalleeParam$2);
  }
}
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(0);
let tmpBinBothRhs = tmpCallCallee$3(tmpCalleeParam$3);
if (tmpBinBothRhs) {
} else {
  const tmpCallCallee$4 = $;
  const tmpCalleeParam$4 = $(1);
  tmpBinBothRhs = tmpCallCallee$4(tmpCalleeParam$4);
  if (tmpBinBothRhs) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    tmpBinBothRhs = tmpCallCallee$5(tmpCalleeParam$5);
  }
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpBinBothLhs = $(tmpCalleeParam);
if (tmpBinBothLhs) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpBinBothLhs = $(tmpCalleeParam$1);
  if (tmpBinBothLhs) {
    const tmpCalleeParam$2 = $(2);
    tmpBinBothLhs = $(tmpCalleeParam$2);
  }
}
const tmpCalleeParam$3 = $(0);
let tmpBinBothRhs = $(tmpCalleeParam$3);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$4 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$4);
  if (tmpBinBothRhs) {
    const tmpCalleeParam$5 = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$5);
  }
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
