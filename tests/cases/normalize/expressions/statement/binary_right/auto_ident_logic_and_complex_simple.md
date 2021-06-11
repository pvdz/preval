# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($($(1)) && 2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($($(1)) && 2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam = $(1);
let tmpBinBothRhs = $(tmpCalleeParam);
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
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
