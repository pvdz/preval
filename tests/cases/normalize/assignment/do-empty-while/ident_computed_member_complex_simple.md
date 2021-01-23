# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > do-while > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
do {} while (a = $(b)[$('x')] = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
while (true) {
  {
    tmpNestedAssignObj = $(b);
    tmpNestedAssignComMemberObj = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedPropAssignRhs = c;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
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
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignComMemberObj = tmpNestedAssignObj;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
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
 - 0: {"x":3}
 - 1: "x"
 - 2: {"x":3}
 - 3: "x"
 - 4: {"x":3}
 - 5: "x"
 - 6: {"x":3}
 - 7: "x"
 - 8: {"x":3}
 - 9: "x"
 - 10: {"x":3}
 - 11: "x"
 - 12: {"x":3}
 - 13: "x"
 - 14: {"x":3}
 - 15: "x"
 - 16: {"x":3}
 - 17: "x"
 - 18: {"x":3}
 - 19: "x"
 - 20: {"x":3}
 - 21: "x"
 - 22: {"x":3}
 - 23: "x"
 - 24: {"x":3}
 - 25: "x"
 - 26: {"x":3}
 - 27: "x"
 - 28: {"x":3}
 - 29: "x"
 - 30: {"x":3}
 - 31: "x"
 - 32: {"x":3}
 - 33: "x"
 - 34: {"x":3}
 - 35: "x"
 - 36: {"x":3}
 - 37: "x"
 - 38: {"x":3}
 - 39: "x"
 - 40: {"x":3}
 - 41: "x"
 - 42: {"x":3}
 - 43: "x"
 - 44: {"x":3}
 - 45: "x"
 - 46: {"x":3}
 - 47: "x"
 - 48: {"x":3}
 - 49: "x"
 - 50: {"x":3}
 - 51: "x"
 - 52: {"x":3}
 - 53: "x"
 - 54: {"x":3}
 - 55: "x"
 - 56: {"x":3}
 - 57: "x"
 - 58: {"x":3}
 - 59: "x"
 - 60: {"x":3}
 - 61: "x"
 - 62: {"x":3}
 - 63: "x"
 - 64: {"x":3}
 - 65: "x"
 - 66: {"x":3}
 - 67: "x"
 - 68: {"x":3}
 - 69: "x"
 - 70: {"x":3}
 - 71: "x"
 - 72: {"x":3}
 - 73: "x"
 - 74: {"x":3}
 - 75: "x"
 - 76: {"x":3}
 - 77: "x"
 - 78: {"x":3}
 - 79: "x"
 - 80: {"x":3}
 - 81: "x"
 - 82: {"x":3}
 - 83: "x"
 - 84: {"x":3}
 - 85: "x"
 - 86: {"x":3}
 - 87: "x"
 - 88: {"x":3}
 - 89: "x"
 - 90: {"x":3}
 - 91: "x"
 - 92: {"x":3}
 - 93: "x"
 - 94: {"x":3}
 - 95: "x"
 - 96: {"x":3}
 - 97: "x"
 - 98: {"x":3}
 - 99: "x"
 - 100: {"x":3}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
