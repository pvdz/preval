# Preval test case

# auto_ident_unary_excl_complex.md

> normalize > expressions > assignments > switch_default > auto_ident_unary_excl_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = !$(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    const tmpUnaryArg = $(100);
    a = !tmpUnaryArg;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    const tmpUnaryArg = $(100);
    a = !tmpUnaryArg;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same