# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > do-while > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let n = 0;
do { if ($(n++)) break; } while ([x, y] = ($(x), $(y), z));
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
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
  $(x);
  $(y);
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  ifTestTmp = arrAssignPatternRhs;
} while (ifTestTmp);
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
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
  $(x);
  $(y);
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  ifTestTmp = arrAssignPatternRhs;
} while (ifTestTmp);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 10,20,[10,20,30]
 - 5: undefined

Normalized calls: Same

Final output calls: Same
