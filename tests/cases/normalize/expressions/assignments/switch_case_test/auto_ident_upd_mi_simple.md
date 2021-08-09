# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = --b):
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = --b)) {
  } else {
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, b);
`````

## Output

`````js filename=intro
$(1);
$(0, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
