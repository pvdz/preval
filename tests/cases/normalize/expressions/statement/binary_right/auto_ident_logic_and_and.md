# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Binary right > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($($(1)) && $($(1)) && $($(2)));
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
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpBinBothRhs) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpBinBothRhs = tmpCallCallee$2(tmpCalleeParam$2);
  }
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCalleeParam = $(1);
let tmpBinBothRhs = $(tmpCalleeParam);
if (tmpBinBothRhs) {
  const tmpCalleeParam$1 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$1);
  if (tmpBinBothRhs) {
    const tmpCalleeParam$2 = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$2);
  }
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
