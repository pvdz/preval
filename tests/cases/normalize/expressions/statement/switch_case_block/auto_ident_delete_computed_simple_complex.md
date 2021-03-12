# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > Switch case block > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    delete arg[$("y")];
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $('y');
  delete tmpDeleteCompObj[tmpDeleteCompProp];
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpDeleteCompProp = $('y');
  delete arg[tmpDeleteCompProp];
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'y'
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
