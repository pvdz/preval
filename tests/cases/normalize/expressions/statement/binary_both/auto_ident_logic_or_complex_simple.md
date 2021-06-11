# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || 2) + ($($(0)) || 2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || 2) + ($($(0)) || 2);
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
  tmpBinBothLhs = 2;
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
let tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpBinBothRhs) {
} else {
  tmpBinBothRhs = 2;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let tmpBinBothLhs = $(tmpCalleeParam);
if (tmpBinBothLhs) {
} else {
  tmpBinBothLhs = 2;
}
const tmpCalleeParam$1 = $(0);
let tmpBinBothRhs = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
} else {
  tmpBinBothRhs = 2;
}
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
