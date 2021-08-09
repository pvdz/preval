# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $($(0)) || ($($(1)) && $($(2)));
  }
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = $($(0)) || ($($(1)) && $($(2)));
    }
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    if (a) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      a = tmpCallCallee$3(tmpCalleeParam$3);
    } else {
    }
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
    } else {
    }
  }
} else {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 0
 - 4: 0
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
