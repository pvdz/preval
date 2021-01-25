# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > for-b > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (;a = b.x = $(c).y = $(d););
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  while (true) {
    tmpNestedAssignMemberObj = b;
    tmpNestedAssignObj = $(c);
    tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
    tmpNestedAssignMemberRhs$1 = $(d);
    tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
    tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    a = tmpNestedAssignMemberRhs;
    const tmpIfTest = tmpNestedAssignMemberRhs;
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignObj = $(3);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs$1 = $(4);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  const tmpIfTest = tmpNestedAssignMemberRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 3
 - 3: 4
 - 4: 3
 - 5: 4
 - 6: 3
 - 7: 4
 - 8: 3
 - 9: 4
 - 10: 3
 - 11: 4
 - 12: 3
 - 13: 4
 - 14: 3
 - 15: 4
 - 16: 3
 - 17: 4
 - 18: 3
 - 19: 4
 - 20: 3
 - 21: 4
 - 22: 3
 - 23: 4
 - 24: 3
 - 25: 4
 - 26: 3
 - 27: 4
 - 28: 3
 - 29: 4
 - 30: 3
 - 31: 4
 - 32: 3
 - 33: 4
 - 34: 3
 - 35: 4
 - 36: 3
 - 37: 4
 - 38: 3
 - 39: 4
 - 40: 3
 - 41: 4
 - 42: 3
 - 43: 4
 - 44: 3
 - 45: 4
 - 46: 3
 - 47: 4
 - 48: 3
 - 49: 4
 - 50: 3
 - 51: 4
 - 52: 3
 - 53: 4
 - 54: 3
 - 55: 4
 - 56: 3
 - 57: 4
 - 58: 3
 - 59: 4
 - 60: 3
 - 61: 4
 - 62: 3
 - 63: 4
 - 64: 3
 - 65: 4
 - 66: 3
 - 67: 4
 - 68: 3
 - 69: 4
 - 70: 3
 - 71: 4
 - 72: 3
 - 73: 4
 - 74: 3
 - 75: 4
 - 76: 3
 - 77: 4
 - 78: 3
 - 79: 4
 - 80: 3
 - 81: 4
 - 82: 3
 - 83: 4
 - 84: 3
 - 85: 4
 - 86: 3
 - 87: 4
 - 88: 3
 - 89: 4
 - 90: 3
 - 91: 4
 - 92: 3
 - 93: 4
 - 94: 3
 - 95: 4
 - 96: 3
 - 97: 4
 - 98: 3
 - 99: 4
 - 100: 3
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
