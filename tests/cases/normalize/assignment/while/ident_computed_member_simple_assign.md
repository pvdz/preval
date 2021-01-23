# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > while > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
while (a = b[$('x')] = $(c)[$('y')] = $(d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
while (true) {
  {
    tmpNestedAssignComMemberObj = b;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
    tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
    tmpNestedAssignObj = $(c);
    tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
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
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignObj = $(3);
  tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
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
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: "x"
 - 5: 3
 - 6: "y"
 - 7: 4
 - 8: "x"
 - 9: 3
 - 10: "y"
 - 11: 4
 - 12: "x"
 - 13: 3
 - 14: "y"
 - 15: 4
 - 16: "x"
 - 17: 3
 - 18: "y"
 - 19: 4
 - 20: "x"
 - 21: 3
 - 22: "y"
 - 23: 4
 - 24: "x"
 - 25: 3
 - 26: "y"
 - 27: 4
 - 28: "x"
 - 29: 3
 - 30: "y"
 - 31: 4
 - 32: "x"
 - 33: 3
 - 34: "y"
 - 35: 4
 - 36: "x"
 - 37: 3
 - 38: "y"
 - 39: 4
 - 40: "x"
 - 41: 3
 - 42: "y"
 - 43: 4
 - 44: "x"
 - 45: 3
 - 46: "y"
 - 47: 4
 - 48: "x"
 - 49: 3
 - 50: "y"
 - 51: 4
 - 52: "x"
 - 53: 3
 - 54: "y"
 - 55: 4
 - 56: "x"
 - 57: 3
 - 58: "y"
 - 59: 4
 - 60: "x"
 - 61: 3
 - 62: "y"
 - 63: 4
 - 64: "x"
 - 65: 3
 - 66: "y"
 - 67: 4
 - 68: "x"
 - 69: 3
 - 70: "y"
 - 71: 4
 - 72: "x"
 - 73: 3
 - 74: "y"
 - 75: 4
 - 76: "x"
 - 77: 3
 - 78: "y"
 - 79: 4
 - 80: "x"
 - 81: 3
 - 82: "y"
 - 83: 4
 - 84: "x"
 - 85: 3
 - 86: "y"
 - 87: 4
 - 88: "x"
 - 89: 3
 - 90: "y"
 - 91: 4
 - 92: "x"
 - 93: 3
 - 94: "y"
 - 95: 4
 - 96: "x"
 - 97: 3
 - 98: "y"
 - 99: 4
 - 100: "x"
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
