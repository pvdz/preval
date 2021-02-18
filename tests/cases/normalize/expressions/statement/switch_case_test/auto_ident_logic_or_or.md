# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > statement > switch_case_test > auto_ident_logic_or_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $($(0)) || $($(1)) || $($(2)):
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpBinLhs = tmpCallCallee(tmpCalleeParam);
if (tmpBinLhs) {
} else {
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
$(1);
const tmpCalleeParam = $(0);
let tmpBinLhs = $(tmpCalleeParam);
if (tmpBinLhs) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpBinLhs = $(tmpCalleeParam$1);
}
if (tmpBinLhs) {
} else {
  const tmpCalleeParam$2 = $(2);
  tmpBinLhs = $(tmpCalleeParam$2);
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
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
