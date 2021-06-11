# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Binary right > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
if (tmpBinBothRhs) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpBinBothRhs) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpBinBothRhs = tmpCallCallee$3(tmpCalleeParam$3);
  } else {
  }
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam = $(0);
let tmpBinBothRhs = $(tmpCalleeParam);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$1);
  if (tmpBinBothRhs) {
    const tmpCalleeParam$3 = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$3);
  } else {
  }
}
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
