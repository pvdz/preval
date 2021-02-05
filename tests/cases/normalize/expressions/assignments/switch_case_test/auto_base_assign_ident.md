# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > assignments > switch_case_test > auto_base_assign_ident
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

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    let tmpNestedComplexRhs;
    const tmpNestedComplexRhs$1 = $(2);
    b = tmpNestedComplexRhs$1;
    tmpNestedComplexRhs = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs;
    tmpBinBothRhs = tmpNestedComplexRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
    }
    tmpFallthrough = true;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs = tmpSwitchTest;
  let tmpBinBothRhs;
  let tmpNestedComplexRhs;
  const tmpNestedComplexRhs$1 = $(2);
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpBinBothRhs = tmpNestedComplexRhs;
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  tmpFallthrough = true;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
