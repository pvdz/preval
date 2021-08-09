# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Switch case test > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b = $(2)):
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = b = $(2))) {
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
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, b);
`````

## Output

`````js filename=intro
$(1);
const tmpNestedComplexRhs = $(2);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
