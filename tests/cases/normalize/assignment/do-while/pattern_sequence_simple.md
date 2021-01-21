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
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let n = 0;
do {
  {
    tmpPostfixArg = n;
    n = n + 1;
    tmpArg = tmpPostfixArg;
    let ifTestTmp_1 = $(tmpArg);
    if (ifTestTmp_1) {
      break;
    }
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
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
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
 - 4: 10
 - 5: 20
 - 6: 2
 - 7: 10
 - 8: 20
 - 9: 3
 - 10: 10
 - 11: 20
 - 12: 4
 - 13: 10
 - 14: 20
 - 15: 5
 - 16: 10
 - 17: 20
 - 18: 6
 - 19: 10
 - 20: 20
 - 21: 7
 - 22: 10
 - 23: 20
 - 24: 8
 - 25: 10
 - 26: 20
 - 27: 9
 - 28: 10
 - 29: 20
 - 30: 10
 - 31: 10
 - 32: 20
 - 33: 11
 - 34: 10
 - 35: 20
 - 36: 12
 - 37: 10
 - 38: 20
 - 39: 13
 - 40: 10
 - 41: 20
 - 42: 14
 - 43: 10
 - 44: 20
 - 45: 15
 - 46: 10
 - 47: 20
 - 48: 16
 - 49: 10
 - 50: 20
 - 51: 17
 - 52: 10
 - 53: 20
 - 54: 18
 - 55: 10
 - 56: 20
 - 57: 19
 - 58: 10
 - 59: 20
 - 60: 20
 - 61: 10
 - 62: 20
 - 63: 21
 - 64: 10
 - 65: 20
 - 66: 22
 - 67: 10
 - 68: 20
 - 69: 23
 - 70: 10
 - 71: 20
 - 72: 24
 - 73: 10
 - 74: 20
 - 75: 25
 - 76: 10
 - 77: 20
 - 78: 26
 - 79: 10
 - 80: 20
 - 81: 27
 - 82: 10
 - 83: 20
 - 84: 28
 - 85: 10
 - 86: 20
 - 87: 29
 - 88: 10
 - 89: 20
 - 90: 30
 - 91: 10
 - 92: 20
 - 93: 31
 - 94: 10
 - 95: 20
 - 96: 32
 - 97: 10
 - 98: 20
 - 99: 33
 - 100: 10
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
