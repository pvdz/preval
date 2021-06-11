# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && 2) + ($($(1)) && 2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && 2) + ($($(1)) && 2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpBinBothLhs = tmpCallCallee(tmpCalleeParam);
if (tmpBinBothLhs) {
  tmpBinBothLhs = 2;
} else {
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
let tmpBinBothLhs = $(tmpCalleeParam);
if (tmpBinBothLhs) {
  tmpBinBothLhs = 2;
} else {
}
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
