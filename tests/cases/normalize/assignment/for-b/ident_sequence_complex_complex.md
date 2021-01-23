# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (;a = ($(b), $(c)).x = $(c););
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = 2;
let c = 3;
{
  while (true) {
    {
      $(b);
      tmpNestedAssignObj = $(c);
      tmpNestedAssignMemberObj = tmpNestedAssignObj;
      tmpNestedAssignMemberRhs = $(c);
      tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
      a = tmpNestedAssignMemberRhs;
      let ifTestTmp = a;
      if (ifTestTmp) {
      } else {
        break;
      }
    }
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
while (true) {
  $(2);
  tmpNestedAssignObj = $(3);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = $(3);
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 3
 - 3: 2
 - 4: 3
 - 5: 3
 - 6: 2
 - 7: 3
 - 8: 3
 - 9: 2
 - 10: 3
 - 11: 3
 - 12: 2
 - 13: 3
 - 14: 3
 - 15: 2
 - 16: 3
 - 17: 3
 - 18: 2
 - 19: 3
 - 20: 3
 - 21: 2
 - 22: 3
 - 23: 3
 - 24: 2
 - 25: 3
 - 26: 3
 - 27: 2
 - 28: 3
 - 29: 3
 - 30: 2
 - 31: 3
 - 32: 3
 - 33: 2
 - 34: 3
 - 35: 3
 - 36: 2
 - 37: 3
 - 38: 3
 - 39: 2
 - 40: 3
 - 41: 3
 - 42: 2
 - 43: 3
 - 44: 3
 - 45: 2
 - 46: 3
 - 47: 3
 - 48: 2
 - 49: 3
 - 50: 3
 - 51: 2
 - 52: 3
 - 53: 3
 - 54: 2
 - 55: 3
 - 56: 3
 - 57: 2
 - 58: 3
 - 59: 3
 - 60: 2
 - 61: 3
 - 62: 3
 - 63: 2
 - 64: 3
 - 65: 3
 - 66: 2
 - 67: 3
 - 68: 3
 - 69: 2
 - 70: 3
 - 71: 3
 - 72: 2
 - 73: 3
 - 74: 3
 - 75: 2
 - 76: 3
 - 77: 3
 - 78: 2
 - 79: 3
 - 80: 3
 - 81: 2
 - 82: 3
 - 83: 3
 - 84: 2
 - 85: 3
 - 86: 3
 - 87: 2
 - 88: 3
 - 89: 3
 - 90: 2
 - 91: 3
 - 92: 3
 - 93: 2
 - 94: 3
 - 95: 3
 - 96: 2
 - 97: 3
 - 98: 3
 - 99: 2
 - 100: 3
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
