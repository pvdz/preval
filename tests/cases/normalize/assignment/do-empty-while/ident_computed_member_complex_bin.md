# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > do-while > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
do {} while (a = $(b)[$('x')] = c + d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
while (true) {
  {
    tmpNestedAssignCompMemberObj = $(b);
    tmpNestedAssignCompMemberProp = $('x');
    tmpNestedAssignCompMemberRhs = c + d;
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
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignCompMemberObj = $(b);
  tmpNestedAssignCompMemberProp = $('x');
  tmpNestedAssignCompMemberRhs = 7;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  a = tmpNestedAssignCompMemberRhs;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: {"x":7}
 - 1: "x"
 - 2: {"x":7}
 - 3: "x"
 - 4: {"x":7}
 - 5: "x"
 - 6: {"x":7}
 - 7: "x"
 - 8: {"x":7}
 - 9: "x"
 - 10: {"x":7}
 - 11: "x"
 - 12: {"x":7}
 - 13: "x"
 - 14: {"x":7}
 - 15: "x"
 - 16: {"x":7}
 - 17: "x"
 - 18: {"x":7}
 - 19: "x"
 - 20: {"x":7}
 - 21: "x"
 - 22: {"x":7}
 - 23: "x"
 - 24: {"x":7}
 - 25: "x"
 - 26: {"x":7}
 - 27: "x"
 - 28: {"x":7}
 - 29: "x"
 - 30: {"x":7}
 - 31: "x"
 - 32: {"x":7}
 - 33: "x"
 - 34: {"x":7}
 - 35: "x"
 - 36: {"x":7}
 - 37: "x"
 - 38: {"x":7}
 - 39: "x"
 - 40: {"x":7}
 - 41: "x"
 - 42: {"x":7}
 - 43: "x"
 - 44: {"x":7}
 - 45: "x"
 - 46: {"x":7}
 - 47: "x"
 - 48: {"x":7}
 - 49: "x"
 - 50: {"x":7}
 - 51: "x"
 - 52: {"x":7}
 - 53: "x"
 - 54: {"x":7}
 - 55: "x"
 - 56: {"x":7}
 - 57: "x"
 - 58: {"x":7}
 - 59: "x"
 - 60: {"x":7}
 - 61: "x"
 - 62: {"x":7}
 - 63: "x"
 - 64: {"x":7}
 - 65: "x"
 - 66: {"x":7}
 - 67: "x"
 - 68: {"x":7}
 - 69: "x"
 - 70: {"x":7}
 - 71: "x"
 - 72: {"x":7}
 - 73: "x"
 - 74: {"x":7}
 - 75: "x"
 - 76: {"x":7}
 - 77: "x"
 - 78: {"x":7}
 - 79: "x"
 - 80: {"x":7}
 - 81: "x"
 - 82: {"x":7}
 - 83: "x"
 - 84: {"x":7}
 - 85: "x"
 - 86: {"x":7}
 - 87: "x"
 - 88: {"x":7}
 - 89: "x"
 - 90: {"x":7}
 - 91: "x"
 - 92: {"x":7}
 - 93: "x"
 - 94: {"x":7}
 - 95: "x"
 - 96: {"x":7}
 - 97: "x"
 - 98: {"x":7}
 - 99: "x"
 - 100: {"x":7}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
