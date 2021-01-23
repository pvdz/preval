# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > do-while > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
do {} while (a = $(b).x = $(c).y = $(d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
while (true) {
  {
    tmpNestedAssignObj = $(b);
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    tmpNestedAssignObj$1 = $(c);
    tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
    tmpNestedAssignMemberRhs$1 = $(d);
    tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
    tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    a = tmpNestedAssignMemberRhs;
    let ifTestTmp = a;
    if (ifTestTmp) {
    } else {
      break;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj$1 = $(3);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignMemberRhs$1 = $(4);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":4}
 - 1: 3
 - 2: 4
 - 3: {"x":4}
 - 4: 3
 - 5: 4
 - 6: {"x":4}
 - 7: 3
 - 8: 4
 - 9: {"x":4}
 - 10: 3
 - 11: 4
 - 12: {"x":4}
 - 13: 3
 - 14: 4
 - 15: {"x":4}
 - 16: 3
 - 17: 4
 - 18: {"x":4}
 - 19: 3
 - 20: 4
 - 21: {"x":4}
 - 22: 3
 - 23: 4
 - 24: {"x":4}
 - 25: 3
 - 26: 4
 - 27: {"x":4}
 - 28: 3
 - 29: 4
 - 30: {"x":4}
 - 31: 3
 - 32: 4
 - 33: {"x":4}
 - 34: 3
 - 35: 4
 - 36: {"x":4}
 - 37: 3
 - 38: 4
 - 39: {"x":4}
 - 40: 3
 - 41: 4
 - 42: {"x":4}
 - 43: 3
 - 44: 4
 - 45: {"x":4}
 - 46: 3
 - 47: 4
 - 48: {"x":4}
 - 49: 3
 - 50: 4
 - 51: {"x":4}
 - 52: 3
 - 53: 4
 - 54: {"x":4}
 - 55: 3
 - 56: 4
 - 57: {"x":4}
 - 58: 3
 - 59: 4
 - 60: {"x":4}
 - 61: 3
 - 62: 4
 - 63: {"x":4}
 - 64: 3
 - 65: 4
 - 66: {"x":4}
 - 67: 3
 - 68: 4
 - 69: {"x":4}
 - 70: 3
 - 71: 4
 - 72: {"x":4}
 - 73: 3
 - 74: 4
 - 75: {"x":4}
 - 76: 3
 - 77: 4
 - 78: {"x":4}
 - 79: 3
 - 80: 4
 - 81: {"x":4}
 - 82: 3
 - 83: 4
 - 84: {"x":4}
 - 85: 3
 - 86: 4
 - 87: {"x":4}
 - 88: 3
 - 89: 4
 - 90: {"x":4}
 - 91: 3
 - 92: 4
 - 93: {"x":4}
 - 94: 3
 - 95: 4
 - 96: {"x":4}
 - 97: 3
 - 98: 4
 - 99: {"x":4}
 - 100: 3
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
