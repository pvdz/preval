# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > assignments > switch_case_block > auto_base_assign_pattern_arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = [b] = $([$(2)]);
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
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
      const tmpArrElement = $(2);
      const tmpCalleeParam = [tmpArrElement];
      const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
      const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
      b = arrPatternSplat[0];
      a = tmpNestedAssignArrPatternRhs;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
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
      const tmpArrElement = $(2);
      const tmpCalleeParam = [tmpArrElement];
      const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
      const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
      b = arrPatternSplat[0];
      a = tmpNestedAssignArrPatternRhs;
    }
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: [2]
 - 5: [2], 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same