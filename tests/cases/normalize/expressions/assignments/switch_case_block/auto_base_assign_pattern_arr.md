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
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
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
    tmpFallthrough = true;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
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
    tmpFallthrough = true;
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

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
