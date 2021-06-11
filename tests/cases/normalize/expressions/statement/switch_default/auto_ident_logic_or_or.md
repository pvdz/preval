# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Switch default > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $($(0)) || $($(1)) || $($(2));
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $($(0)) || $($(1)) || $($(2));
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest$1) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$1 = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest$1) {
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpCallCallee$3(tmpCalleeParam$3);
    }
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $(0);
const tmpIfTest$1 = $(tmpCalleeParam);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$1 = $(1);
  const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 = $(2);
    $(tmpCalleeParam$3);
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
