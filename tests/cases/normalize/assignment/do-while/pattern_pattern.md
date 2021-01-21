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
do { if ($(n++)) break; } while ([a, b] = [, x, y] = z);
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let b = 2;
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
  arrAssignPatternRhs_1 = z;
  arrPatternSplat_1 = [...arrAssignPatternRhs_1];
  x = arrPatternSplat_1[1];
  y = arrPatternSplat_1[2];
  arrAssignPatternRhs = arrAssignPatternRhs_1;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  ifTestTmp = arrAssignPatternRhs;
} while (ifTestTmp);
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
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
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  arrAssignPatternRhs_1 = z;
  arrPatternSplat_1 = [...arrAssignPatternRhs_1];
  x = arrPatternSplat_1[1];
  y = arrPatternSplat_1[2];
  arrAssignPatternRhs = arrAssignPatternRhs_1;
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
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 11
 - 12: 12
 - 13: 13
 - 14: 14
 - 15: 15
 - 16: 16
 - 17: 17
 - 18: 18
 - 19: 19
 - 20: 20
 - 21: 21
 - 22: 22
 - 23: 23
 - 24: 24
 - 25: 25
 - 26: 26
 - 27: 27
 - 28: 28
 - 29: 29
 - 30: 30
 - 31: 31
 - 32: 32
 - 33: 33
 - 34: 34
 - 35: 35
 - 36: 36
 - 37: 37
 - 38: 38
 - 39: 39
 - 40: 40
 - 41: 41
 - 42: 42
 - 43: 43
 - 44: 44
 - 45: 45
 - 46: 46
 - 47: 47
 - 48: 48
 - 49: 49
 - 50: 50
 - 51: 51
 - 52: 52
 - 53: 53
 - 54: 54
 - 55: 55
 - 56: 56
 - 57: 57
 - 58: 58
 - 59: 59
 - 60: 60
 - 61: 61
 - 62: 62
 - 63: 63
 - 64: 64
 - 65: 65
 - 66: 66
 - 67: 67
 - 68: 68
 - 69: 69
 - 70: 70
 - 71: 71
 - 72: 72
 - 73: 73
 - 74: 74
 - 75: 75
 - 76: 76
 - 77: 77
 - 78: 78
 - 79: 79
 - 80: 80
 - 81: 81
 - 82: 82
 - 83: 83
 - 84: 84
 - 85: 85
 - 86: 86
 - 87: 87
 - 88: 88
 - 89: 89
 - 90: 90
 - 91: 91
 - 92: 92
 - 93: 93
 - 94: 94
 - 95: 95
 - 96: 96
 - 97: 97
 - 98: 98
 - 99: 99
 - 100: 100
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same