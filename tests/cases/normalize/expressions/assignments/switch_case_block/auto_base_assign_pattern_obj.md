# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > assignments > switch_case_block > auto_base_assign_pattern_obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = { b } = $({ b: $(2) });
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    {
      const tmpCallCallee = $;
      const tmpObjLitVal = $(2);
      const tmpCalleeParam = { b: tmpObjLitVal };
      const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
      b = tmpNestedAssignObjPatternRhs.b;
      a = tmpNestedAssignObjPatternRhs;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    {
      const tmpObjLitVal = $(2);
      const tmpCalleeParam = { b: tmpObjLitVal };
      const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
      b = tmpNestedAssignObjPatternRhs.b;
      a = tmpNestedAssignObjPatternRhs;
    }
  }
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { b: '2' }
 - 5: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
