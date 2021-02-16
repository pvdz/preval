# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > statement > switch_discriminant > auto_ident_logic_or_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(0)) || ($($(1)) && $($(2)))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpSwitchTest = tmpCallCallee(tmpCalleeParam);
if (tmpSwitchTest) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpSwitchTest = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpSwitchTest) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpSwitchTest = tmpCallCallee$2(tmpCalleeParam$2);
  }
}
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpSwitchTest = $(tmpCalleeParam);
if (tmpSwitchTest) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpSwitchTest = $(tmpCalleeParam$1);
  if (tmpSwitchTest) {
    const tmpCalleeParam$2 = $(2);
    tmpSwitchTest = $(tmpCalleeParam$2);
  }
}
const tmpSwitchValue = tmpSwitchTest;
const tmpIfTest = 0 <= 0;
if (tmpIfTest) {
  $(100);
}
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
 - 7: 100
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
