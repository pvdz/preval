# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > for-b > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (;a = $(b).x = c;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  while (true) {
    {
      tmpNestedAssignObj = $(b);
      tmpNestedPropAssignRhs = c;
      tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
      a = tmpNestedPropAssignRhs;
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
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
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
 - 1: {"x":3}
 - 2: {"x":3}
 - 3: {"x":3}
 - 4: {"x":3}
 - 5: {"x":3}
 - 6: {"x":3}
 - 7: {"x":3}
 - 8: {"x":3}
 - 9: {"x":3}
 - 10: {"x":3}
 - 11: {"x":3}
 - 12: {"x":3}
 - 13: {"x":3}
 - 14: {"x":3}
 - 15: {"x":3}
 - 16: {"x":3}
 - 17: {"x":3}
 - 18: {"x":3}
 - 19: {"x":3}
 - 20: {"x":3}
 - 21: {"x":3}
 - 22: {"x":3}
 - 23: {"x":3}
 - 24: {"x":3}
 - 25: {"x":3}
 - 26: {"x":3}
 - 27: {"x":3}
 - 28: {"x":3}
 - 29: {"x":3}
 - 30: {"x":3}
 - 31: {"x":3}
 - 32: {"x":3}
 - 33: {"x":3}
 - 34: {"x":3}
 - 35: {"x":3}
 - 36: {"x":3}
 - 37: {"x":3}
 - 38: {"x":3}
 - 39: {"x":3}
 - 40: {"x":3}
 - 41: {"x":3}
 - 42: {"x":3}
 - 43: {"x":3}
 - 44: {"x":3}
 - 45: {"x":3}
 - 46: {"x":3}
 - 47: {"x":3}
 - 48: {"x":3}
 - 49: {"x":3}
 - 50: {"x":3}
 - 51: {"x":3}
 - 52: {"x":3}
 - 53: {"x":3}
 - 54: {"x":3}
 - 55: {"x":3}
 - 56: {"x":3}
 - 57: {"x":3}
 - 58: {"x":3}
 - 59: {"x":3}
 - 60: {"x":3}
 - 61: {"x":3}
 - 62: {"x":3}
 - 63: {"x":3}
 - 64: {"x":3}
 - 65: {"x":3}
 - 66: {"x":3}
 - 67: {"x":3}
 - 68: {"x":3}
 - 69: {"x":3}
 - 70: {"x":3}
 - 71: {"x":3}
 - 72: {"x":3}
 - 73: {"x":3}
 - 74: {"x":3}
 - 75: {"x":3}
 - 76: {"x":3}
 - 77: {"x":3}
 - 78: {"x":3}
 - 79: {"x":3}
 - 80: {"x":3}
 - 81: {"x":3}
 - 82: {"x":3}
 - 83: {"x":3}
 - 84: {"x":3}
 - 85: {"x":3}
 - 86: {"x":3}
 - 87: {"x":3}
 - 88: {"x":3}
 - 89: {"x":3}
 - 90: {"x":3}
 - 91: {"x":3}
 - 92: {"x":3}
 - 93: {"x":3}
 - 94: {"x":3}
 - 95: {"x":3}
 - 96: {"x":3}
 - 97: {"x":3}
 - 98: {"x":3}
 - 99: {"x":3}
 - 100: {"x":3}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
