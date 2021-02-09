# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > statement > switch_case_test > auto_ident_logic_and_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $($(1)) && $($(1)) && $($(2)):
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    let tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
    if (tmpBinBothRhs) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
    }
    if (tmpBinBothRhs) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpBinBothRhs = tmpCallCallee$2(tmpCalleeParam$2);
    }
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
    }
    tmpFallthrough = true;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    let tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
    if (tmpBinBothRhs) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
    }
    if (tmpBinBothRhs) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpBinBothRhs = tmpCallCallee$2(tmpCalleeParam$2);
    }
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
    }
    tmpFallthrough = true;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
