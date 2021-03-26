# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(1)) && $($(1)) && $($(2))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $($(1)) && $($(1)) && $($(2));
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(100);
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpSwitchValue = tmpCallCallee(tmpCalleeParam);
if (tmpSwitchValue) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpSwitchValue = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpSwitchValue) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpSwitchValue = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpSwitchValue = $(tmpCalleeParam);
if (tmpSwitchValue) {
  const tmpCalleeParam$1 = $(1);
  const SSA_tmpSwitchValue = $(tmpCalleeParam$1);
  if (SSA_tmpSwitchValue) {
    const tmpCalleeParam$3 = $(2);
    $(tmpCalleeParam$3);
  }
}
$(100);
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
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
