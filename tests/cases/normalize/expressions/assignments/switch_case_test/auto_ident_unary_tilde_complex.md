# Preval test case

# auto_ident_unary_tilde_complex.md

> normalize > expressions > assignments > switch_case_test > auto_ident_unary_tilde_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = ~$(100)):
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: -101
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
