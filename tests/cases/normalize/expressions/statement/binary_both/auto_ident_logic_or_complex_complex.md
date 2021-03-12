# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(2))) + ($($(0)) || $($(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(2))) + ($($(0)) || $($(2)));
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
  const tmpCalleeParam$1 = $(2);
  tmpBinBothLhs = tmpCallCallee$1(tmpCalleeParam$1);
}
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = $(0);
let tmpBinBothRhs = tmpCallCallee$2(tmpCalleeParam$2);
if (tmpBinBothRhs) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpBinBothRhs = tmpCallCallee$3(tmpCalleeParam$3);
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
  const tmpCalleeParam$1 = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$1);
}
const tmpCalleeParam$2 = $(0);
let tmpBinBothRhs = $(tmpCalleeParam$2);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$3 = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$3);
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
 - 3: 2
 - 4: 2
 - 5: 0
 - 6: 0
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
