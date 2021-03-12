# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Switch default > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $($(0)) || ($($(1)) && $($(2)));
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
      $($(0)) || ($($(1)) && $($(2)));
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
  const tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest$1) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    const tmpIfTest$2 = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest$2) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpCallCallee$2(tmpCalleeParam$2);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
const tmpCalleeParam = $(0);
const tmpIfTest$1 = $(tmpCalleeParam);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$1 = $(1);
  const tmpIfTest$2 = $(tmpCalleeParam$1);
  if (tmpIfTest$2) {
    const tmpCalleeParam$2 = $(2);
    $(tmpCalleeParam$2);
  }
}
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
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
