# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > switch_case_test > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = [$(1), 2, $(3)]):
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
a = [tmpArrElement, 2, tmpArrElement$2];
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same