# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Binary left > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && $($(1)) && $($(2))) + $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && $($(1)) && $($(2))) + $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpBinBothLhs = tmpCallCallee(tmpCalleeParam);
if (tmpBinBothLhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpBinBothLhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpBinBothLhs) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpBinBothLhs = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let tmpBinBothLhs = $(tmpCalleeParam);
if (tmpBinBothLhs) {
  const tmpCalleeParam$1 = $(1);
  tmpBinBothLhs = $(tmpCalleeParam$1);
  if (tmpBinBothLhs) {
    const tmpCalleeParam$3 = $(2);
    tmpBinBothLhs = $(tmpCalleeParam$3);
  }
}
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
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
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
