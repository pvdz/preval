# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > assignments > switch_case_test > auto_base_assign_pattern_obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = { b } = $({ b: $(2) })):
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    let tmpNestedComplexRhs;
    const tmpCallCallee = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
    a = tmpNestedComplexRhs;
    tmpBinBothRhs = tmpNestedComplexRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    tmpFallthrough = true;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    let tmpNestedComplexRhs;
    const tmpCallCallee = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
    a = tmpNestedComplexRhs;
    tmpBinBothRhs = tmpNestedComplexRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    tmpFallthrough = true;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
