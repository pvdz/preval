# Preval test case

# pattern_pattern.md

> normalize > assignment > do-while > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
let n = 0;
do {
  if ($(n++)) break;
} while ([a, b] = [, x, y] = z);
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  arrAssignPatternRhs$1 = z;
  arrPatternSplat$1 = [...arrAssignPatternRhs$1];
  x = arrPatternSplat$1[1];
  y = arrPatternSplat$1[2];
  arrAssignPatternRhs = arrAssignPatternRhs$1;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  ifTestTmp = arrAssignPatternRhs;
} while (ifTestTmp);
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  arrAssignPatternRhs$1 = z;
  arrPatternSplat$1 = [...arrAssignPatternRhs$1];
  x = arrPatternSplat$1[1];
  y = arrPatternSplat$1[2];
  arrAssignPatternRhs = arrAssignPatternRhs$1;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  ifTestTmp = arrAssignPatternRhs;
} while (ifTestTmp);
$(a, b, x, y, z);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 1
 - 2: 10,20,20,30,[10,20,30]
 - 3: undefined

Normalized calls: Same

Final output calls: Same
