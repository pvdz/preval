# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Template > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(0)) || ($($(1)) && $($(2))))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + String((a = $($(0)) || ($($(1)) && $($(2))))) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(0);
a = tmpCallCallee$3(tmpCalleeParam$3);
if (a) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(1);
  a = tmpCallCallee$5(tmpCalleeParam$5);
  if (a) {
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$7 = $(2);
    a = tmpCallCallee$7(tmpCalleeParam$7);
  } else {
  }
}
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$3 = $(0);
let a = $(tmpCalleeParam$3);
if (a) {
} else {
  const tmpCalleeParam$5 = $(1);
  a = $(tmpCalleeParam$5);
  if (a) {
    const tmpCalleeParam$7 = $(2);
    a = $(tmpCalleeParam$7);
  } else {
  }
}
const tmpBinBothRhs = String(a);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
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
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
