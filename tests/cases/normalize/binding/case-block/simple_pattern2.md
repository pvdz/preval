# Preval test case

# simple_pattern2.md

> Normalize > Binding > Case-block > Simple pattern2
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a$1 = undefined;
const tmpSwitchValue = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a$1 = tmpNestedAssignArrPatternRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, x, y, z);
`````

## Pre Normal

`````js filename=intro
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a$1 = undefined;
const tmpSwitchValue = $(`a`);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(`a`);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a$1 = tmpNestedAssignArrPatternRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a$1 = undefined;
const tmpSwitchValue = $(`a`);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(`a`);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a$1 = tmpNestedAssignArrPatternRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, x, y, z);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
const z = [10, 20, 30];
const tmpSwitchValue = $(`a`);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(`a`);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
let tmpIfTest$1 = true;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
}
if (tmpIfTest$1) {
  const arrPatternSplat = [...z];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  $(1, x, y, z);
} else {
  $(1, x, y, z);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = [ 10, 20, 30 ];
const d = $( "a" );
let e = 1;
const f = $( "a" );
const g = f === d;
let h = true;
if (g) {
  e = 0;
}
else {
  h = e <= 0;
}
if (h) {
  const i = [ ... c ];
  a = i[ 0 ];
  b = i[ 1 ];
  $( 1, a, b, c );
}
else {
  $( 1, a, b, c );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 10, 20, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
