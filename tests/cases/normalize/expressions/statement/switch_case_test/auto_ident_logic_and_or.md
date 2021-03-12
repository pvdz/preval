# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Switch case test > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case ($($(1)) && $($(1))) || $($(2)):
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ((($($(1)) && $($(1))) || $($(2))) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
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
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpBinLhs = tmpCallCallee(tmpCalleeParam);
if (tmpBinLhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpBinLhs = tmpCallCallee$1(tmpCalleeParam$1);
}
if (tmpBinLhs) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpBinLhs = tmpCallCallee$2(tmpCalleeParam$2);
}
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpCalleeParam = $(1);
let tmpBinLhs = $(tmpCalleeParam);
if (tmpBinLhs) {
  const tmpCalleeParam$1 = $(1);
  tmpBinLhs = $(tmpCalleeParam$1);
}
if (tmpBinLhs) {
} else {
  const tmpCalleeParam$2 = $(2);
  tmpBinLhs = $(tmpCalleeParam$2);
}
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchCaseToStart <= 0;
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
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
