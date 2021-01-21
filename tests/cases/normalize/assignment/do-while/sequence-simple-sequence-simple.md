# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > do-while > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
let n = 0;
do { if ($(n++)) break; } while ((a, b).c = (a, b).c = d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
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
  a;
  tmpNestedAssignMemberObj = b;
  a;
  tmpNestedAssignObj = b;
  tmpNestedAssignObj.c = d;
  tmpNestedAssignMemberRhs = d;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  ifTestTmp = tmpNestedAssignMemberRhs;
} while (ifTestTmp);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignObj = b;
  tmpNestedAssignObj.c = 3;
  tmpNestedAssignMemberRhs = 3;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  ifTestTmp = tmpNestedAssignMemberRhs;
} while (ifTestTmp);
$(1, b, c, 3);
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
