# Preval test case

# ident_member_complex_bin.md

> normalize > assignment > while > ident_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
while (a = $(b).x = c + d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
while (true) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = c + d;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  const tmpIfTest = tmpNestedAssignMemberRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = 7;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  const tmpIfTest = tmpNestedAssignMemberRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: {"x":7}
 - 1: {"x":7}
 - 2: {"x":7}
 - 3: {"x":7}
 - 4: {"x":7}
 - 5: {"x":7}
 - 6: {"x":7}
 - 7: {"x":7}
 - 8: {"x":7}
 - 9: {"x":7}
 - 10: {"x":7}
 - 11: {"x":7}
 - 12: {"x":7}
 - 13: {"x":7}
 - 14: {"x":7}
 - 15: {"x":7}
 - 16: {"x":7}
 - 17: {"x":7}
 - 18: {"x":7}
 - 19: {"x":7}
 - 20: {"x":7}
 - 21: {"x":7}
 - 22: {"x":7}
 - 23: {"x":7}
 - 24: {"x":7}
 - 25: {"x":7}
 - 26: {"x":7}
 - 27: {"x":7}
 - 28: {"x":7}
 - 29: {"x":7}
 - 30: {"x":7}
 - 31: {"x":7}
 - 32: {"x":7}
 - 33: {"x":7}
 - 34: {"x":7}
 - 35: {"x":7}
 - 36: {"x":7}
 - 37: {"x":7}
 - 38: {"x":7}
 - 39: {"x":7}
 - 40: {"x":7}
 - 41: {"x":7}
 - 42: {"x":7}
 - 43: {"x":7}
 - 44: {"x":7}
 - 45: {"x":7}
 - 46: {"x":7}
 - 47: {"x":7}
 - 48: {"x":7}
 - 49: {"x":7}
 - 50: {"x":7}
 - 51: {"x":7}
 - 52: {"x":7}
 - 53: {"x":7}
 - 54: {"x":7}
 - 55: {"x":7}
 - 56: {"x":7}
 - 57: {"x":7}
 - 58: {"x":7}
 - 59: {"x":7}
 - 60: {"x":7}
 - 61: {"x":7}
 - 62: {"x":7}
 - 63: {"x":7}
 - 64: {"x":7}
 - 65: {"x":7}
 - 66: {"x":7}
 - 67: {"x":7}
 - 68: {"x":7}
 - 69: {"x":7}
 - 70: {"x":7}
 - 71: {"x":7}
 - 72: {"x":7}
 - 73: {"x":7}
 - 74: {"x":7}
 - 75: {"x":7}
 - 76: {"x":7}
 - 77: {"x":7}
 - 78: {"x":7}
 - 79: {"x":7}
 - 80: {"x":7}
 - 81: {"x":7}
 - 82: {"x":7}
 - 83: {"x":7}
 - 84: {"x":7}
 - 85: {"x":7}
 - 86: {"x":7}
 - 87: {"x":7}
 - 88: {"x":7}
 - 89: {"x":7}
 - 90: {"x":7}
 - 91: {"x":7}
 - 92: {"x":7}
 - 93: {"x":7}
 - 94: {"x":7}
 - 95: {"x":7}
 - 96: {"x":7}
 - 97: {"x":7}
 - 98: {"x":7}
 - 99: {"x":7}
 - 100: {"x":7}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
