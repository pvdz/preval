# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Statement > Switch case test > Auto ident unary void simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case void arg:
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = undefined;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest = undefined === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchCaseToStart <= 0;
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
