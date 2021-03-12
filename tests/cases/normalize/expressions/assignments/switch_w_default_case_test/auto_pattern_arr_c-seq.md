# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case ([a] = ($(10), $(20), $([1, 2]))):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if (([a] = ($(10), $(20), $([1, 2]))) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
let tmpBinLhs;
$(10);
$(20);
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpBinLhs = tmpNestedAssignArrPatternRhs;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
$(10);
$(20);
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
const SSA_a = arrPatternSplat$1[0];
const tmpIfTest = tmpNestedAssignArrPatternRhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchCaseToStart <= 0;
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
