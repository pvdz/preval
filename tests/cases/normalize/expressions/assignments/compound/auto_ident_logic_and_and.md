# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Compound > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(1)) && $($(1)) && $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpBinBothRhs = tmpCallCallee$2(tmpCalleeParam$2);
  if (tmpBinBothRhs) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpBinBothRhs = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  const tmpCalleeParam$2 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$2);
  if (tmpBinBothRhs) {
    const tmpCalleeParam$3 = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$3);
  }
}
const SSA_a = a * tmpBinBothRhs;
$(SSA_a);
$(SSA_a);
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
 - 7: NaN
 - 8: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
