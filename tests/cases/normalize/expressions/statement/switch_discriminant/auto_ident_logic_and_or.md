# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch (($($(1)) && $($(1))) || $($(2))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = ($($(1)) && $($(1))) || $($(2));
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
} else {
}
if (tmpSwitchValue) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpSwitchValue = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
} else {
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
let tmpSwitchValue = $(tmpCalleeParam);
if (tmpSwitchValue) {
  const tmpCalleeParam$1 = $(1);
  tmpSwitchValue = $(tmpCalleeParam$1);
} else {
}
if (tmpSwitchValue) {
} else {
  const tmpCalleeParam$3 = $(2);
  $(tmpCalleeParam$3);
}
$(100);
const a = { a: 999, b: 1000 };
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
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
