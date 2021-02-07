# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > assignments > switch_case_top > auto_pattern_arr_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    [a] = ($(10), $(20), $([1, 2]));
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
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $(10);
      $(20);
      const tmpCallCallee = $;
      const tmpCalleeParam = [1, 2];
      const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
      const arrPatternSplat$1 = [...arrAssignPatternRhs];
      a = arrPatternSplat$1[0];
      arrAssignPatternRhs;
    }
    tmpFallthrough = true;
  }
}
$(a);
`````

## Output

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
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
      $(10);
      $(20);
      const tmpCallCallee = $;
      const tmpCalleeParam = [1, 2];
      const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
      const arrPatternSplat$1 = [...arrAssignPatternRhs];
      a = arrPatternSplat$1[0];
      arrAssignPatternRhs;
    }
    tmpFallthrough = true;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
