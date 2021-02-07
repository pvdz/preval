# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > statement > switch_case_block > auto_base_assign_pattern_arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    [b] = $([$(2)]);
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
        const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
        const arrPatternSplat = [...arrAssignPatternRhs];
        b = arrPatternSplat[0];
        arrAssignPatternRhs;
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
        const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
        const arrPatternSplat = [...arrAssignPatternRhs];
        b = arrPatternSplat[0];
        arrAssignPatternRhs;
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
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
