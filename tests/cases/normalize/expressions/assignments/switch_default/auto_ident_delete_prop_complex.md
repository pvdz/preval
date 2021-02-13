# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > assignments > switch_default > auto_ident_delete_prop_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = delete $(arg).y;
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    const tmpDeleteObj = $(arg);
    a = delete tmpDeleteObj.y;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    const tmpDeleteObj = $(arg);
    a = delete tmpDeleteObj.y;
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
