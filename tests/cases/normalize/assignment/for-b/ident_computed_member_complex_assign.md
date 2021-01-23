# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > for-b > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (;a = $(b)[$('x')] = $(c)[$('y')] = $(d););
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  while (true) {
    {
      tmpNestedAssignObj = $(b);
      tmpNestedAssignComMemberObj = tmpNestedAssignObj;
      tmpNestedAssignComMemberProp = $('x');
      tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
      tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
      tmpNestedAssignObj$1 = $(c);
      tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
      tmpNestedAssignComMemberProp$1 = $('y');
      tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
      tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
      tmpNestedAssignCompMemberRhs$1 = $(d);
      tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
      tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
      tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
      a = tmpNestedAssignCompMemberRhs;
      let ifTestTmp = a;
      if (ifTestTmp) {
      } else {
        break;
      }
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignComMemberObj = tmpNestedAssignObj;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignObj$1 = $(3);
  tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignComMemberProp$1 = $('y');
  tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
  tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
  tmpNestedAssignCompMemberRhs$1 = $(4);
  tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
  tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  a = tmpNestedAssignCompMemberRhs;
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
 - 1: "x"
 - 2: 3
 - 3: "y"
 - 4: 4
 - 5: {"x":4}
 - 6: "x"
 - 7: 3
 - 8: "y"
 - 9: 4
 - 10: {"x":4}
 - 11: "x"
 - 12: 3
 - 13: "y"
 - 14: 4
 - 15: {"x":4}
 - 16: "x"
 - 17: 3
 - 18: "y"
 - 19: 4
 - 20: {"x":4}
 - 21: "x"
 - 22: 3
 - 23: "y"
 - 24: 4
 - 25: {"x":4}
 - 26: "x"
 - 27: 3
 - 28: "y"
 - 29: 4
 - 30: {"x":4}
 - 31: "x"
 - 32: 3
 - 33: "y"
 - 34: 4
 - 35: {"x":4}
 - 36: "x"
 - 37: 3
 - 38: "y"
 - 39: 4
 - 40: {"x":4}
 - 41: "x"
 - 42: 3
 - 43: "y"
 - 44: 4
 - 45: {"x":4}
 - 46: "x"
 - 47: 3
 - 48: "y"
 - 49: 4
 - 50: {"x":4}
 - 51: "x"
 - 52: 3
 - 53: "y"
 - 54: 4
 - 55: {"x":4}
 - 56: "x"
 - 57: 3
 - 58: "y"
 - 59: 4
 - 60: {"x":4}
 - 61: "x"
 - 62: 3
 - 63: "y"
 - 64: 4
 - 65: {"x":4}
 - 66: "x"
 - 67: 3
 - 68: "y"
 - 69: 4
 - 70: {"x":4}
 - 71: "x"
 - 72: 3
 - 73: "y"
 - 74: 4
 - 75: {"x":4}
 - 76: "x"
 - 77: 3
 - 78: "y"
 - 79: 4
 - 80: {"x":4}
 - 81: "x"
 - 82: 3
 - 83: "y"
 - 84: 4
 - 85: {"x":4}
 - 86: "x"
 - 87: 3
 - 88: "y"
 - 89: 4
 - 90: {"x":4}
 - 91: "x"
 - 92: 3
 - 93: "y"
 - 94: 4
 - 95: {"x":4}
 - 96: "x"
 - 97: 3
 - 98: "y"
 - 99: 4
 - 100: {"x":4}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
