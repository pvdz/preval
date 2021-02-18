# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > assignments > switch_case_test > auto_ident_unary_tilde_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = ~arg):
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
a = ~arg;
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
$(a, arg);
`````

## Output

`````js filename=intro
$(1);
-2;
$(-2, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: -2, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
