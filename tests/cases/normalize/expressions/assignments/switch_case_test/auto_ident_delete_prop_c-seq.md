# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = delete ($(1), $(2), $(arg)).y):
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
$(1);
$(2);
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
$(1);
$(2);
const tmpDeleteObj = $(arg);
const SSA_a = delete tmpDeleteObj.y;
const tmpIfTest = SSA_a === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchCaseToStart <= 0;
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
