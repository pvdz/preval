# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Binary both > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && $($(1)) && $($(2))) + ($($(1)) && $($(1)) && $($(2)));
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
}
if (tmpBinBothLhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpBinBothLhs = tmpCallCallee$2(tmpCalleeParam$2);
}
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(1);
let tmpBinBothRhs = tmpCallCallee$3(tmpCalleeParam$3);
if (tmpBinBothRhs) {
  const tmpCallCallee$4 = $;
  const tmpCalleeParam$4 = $(1);
  tmpBinBothRhs = tmpCallCallee$4(tmpCalleeParam$4);
}
if (tmpBinBothRhs) {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(2);
  tmpBinBothRhs = tmpCallCallee$5(tmpCalleeParam$5);
}
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
}
if (tmpBinBothLhs) {
  const tmpCalleeParam$2 = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$2);
}
const tmpCalleeParam$3 = $(1);
let tmpBinBothRhs = $(tmpCalleeParam$3);
if (tmpBinBothRhs) {
  const tmpCalleeParam$4 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$4);
}
if (tmpBinBothRhs) {
  const tmpCalleeParam$5 = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$5);
}
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
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
