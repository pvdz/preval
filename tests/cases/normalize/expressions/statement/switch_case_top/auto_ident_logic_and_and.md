# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Switch case top > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    $($(1)) && $($(1)) && $($(2));
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $($(1)) && $($(1)) && $($(2));
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest$3 = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest$3) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$3 = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest$3) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpCallCallee$3(tmpCalleeParam$3);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpCalleeParam = $(1);
  const tmpIfTest$3 = $(tmpCalleeParam);
  if (tmpIfTest$3) {
    const tmpCalleeParam$1 = $(1);
    const SSA_tmpIfTest$3 = $(tmpCalleeParam$1);
    if (SSA_tmpIfTest$3) {
      const tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
    }
  }
}
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
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
