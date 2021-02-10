# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > assignments > switch_case_test > auto_pattern_arr_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case ([a] = ($(10), $(20), [1, 2])):
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    $(10);
    $(20);
    const tmpNestedAssignArrPatternRhs = [1, 2];
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat$1[0];
    tmpBinBothRhs = tmpNestedAssignArrPatternRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    tmpFallthrough = true;
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
