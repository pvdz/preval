# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Template > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || ($($(1)) && $($(2)))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + ($($(0)) || ($($(1)) && $($(2)))) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
let tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpBinBothRhs) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  tmpBinBothRhs = tmpCallCallee$3(tmpCalleeParam$3);
  if (tmpBinBothRhs) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    tmpBinBothRhs = tmpCallCallee$5(tmpCalleeParam$5);
  } else {
  }
}
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(0);
let tmpBinBothRhs = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$3 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$3);
  if (tmpBinBothRhs) {
    const tmpCalleeParam$5 = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$5);
  } else {
  }
}
const tmpBinLhs = `before  ` + tmpBinBothRhs;
const tmpCalleeParam = `${tmpBinLhs}  after`;
$(tmpCalleeParam);
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
 - 7: 'before 2 after'
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
