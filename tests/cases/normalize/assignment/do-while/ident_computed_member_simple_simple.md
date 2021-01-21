# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > do-while > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a = b[$('x')] = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
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
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
  tmpNestedComplexRhs = c;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  tmpNestedComplexRhs = 3;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: "x"
 - 2: 1
 - 3: "x"
 - 4: 2
 - 5: "x"
 - 6: 3
 - 7: "x"
 - 8: 4
 - 9: "x"
 - 10: 5
 - 11: "x"
 - 12: 6
 - 13: "x"
 - 14: 7
 - 15: "x"
 - 16: 8
 - 17: "x"
 - 18: 9
 - 19: "x"
 - 20: 10
 - 21: "x"
 - 22: 11
 - 23: "x"
 - 24: 12
 - 25: "x"
 - 26: 13
 - 27: "x"
 - 28: 14
 - 29: "x"
 - 30: 15
 - 31: "x"
 - 32: 16
 - 33: "x"
 - 34: 17
 - 35: "x"
 - 36: 18
 - 37: "x"
 - 38: 19
 - 39: "x"
 - 40: 20
 - 41: "x"
 - 42: 21
 - 43: "x"
 - 44: 22
 - 45: "x"
 - 46: 23
 - 47: "x"
 - 48: 24
 - 49: "x"
 - 50: 25
 - 51: "x"
 - 52: 26
 - 53: "x"
 - 54: 27
 - 55: "x"
 - 56: 28
 - 57: "x"
 - 58: 29
 - 59: "x"
 - 60: 30
 - 61: "x"
 - 62: 31
 - 63: "x"
 - 64: 32
 - 65: "x"
 - 66: 33
 - 67: "x"
 - 68: 34
 - 69: "x"
 - 70: 35
 - 71: "x"
 - 72: 36
 - 73: "x"
 - 74: 37
 - 75: "x"
 - 76: 38
 - 77: "x"
 - 78: 39
 - 79: "x"
 - 80: 40
 - 81: "x"
 - 82: 41
 - 83: "x"
 - 84: 42
 - 85: "x"
 - 86: 43
 - 87: "x"
 - 88: 44
 - 89: "x"
 - 90: 45
 - 91: "x"
 - 92: 46
 - 93: "x"
 - 94: 47
 - 95: "x"
 - 96: 48
 - 97: "x"
 - 98: 49
 - 99: "x"
 - 100: 50
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
