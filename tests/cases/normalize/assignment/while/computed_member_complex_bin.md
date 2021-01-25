# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > while > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
while ($(a)[$('x')] = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
let a = { x: 10 };
let b = 2;
let c = 3;
while (true) {
  tmpAssignMemLhsObj = $(a);
  tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComputedObj = tmpAssignComMemLhsObj;
  tmpAssignComputedProp = tmpAssignComMemLhsProp;
  tmpAssignComputedRhs = b + c;
  tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
  tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs;
  const tmpIfTest = tmpAssignComputedRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
let a = { x: 10 };
while (true) {
  tmpAssignMemLhsObj = $(a);
  tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComputedObj = tmpAssignComMemLhsObj;
  tmpAssignComputedProp = tmpAssignComMemLhsProp;
  tmpAssignComputedRhs = 5;
  tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
  tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs;
  const tmpIfTest = tmpAssignComputedRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: "x"
 - 2: {"x":5}
 - 3: "x"
 - 4: {"x":5}
 - 5: "x"
 - 6: {"x":5}
 - 7: "x"
 - 8: {"x":5}
 - 9: "x"
 - 10: {"x":5}
 - 11: "x"
 - 12: {"x":5}
 - 13: "x"
 - 14: {"x":5}
 - 15: "x"
 - 16: {"x":5}
 - 17: "x"
 - 18: {"x":5}
 - 19: "x"
 - 20: {"x":5}
 - 21: "x"
 - 22: {"x":5}
 - 23: "x"
 - 24: {"x":5}
 - 25: "x"
 - 26: {"x":5}
 - 27: "x"
 - 28: {"x":5}
 - 29: "x"
 - 30: {"x":5}
 - 31: "x"
 - 32: {"x":5}
 - 33: "x"
 - 34: {"x":5}
 - 35: "x"
 - 36: {"x":5}
 - 37: "x"
 - 38: {"x":5}
 - 39: "x"
 - 40: {"x":5}
 - 41: "x"
 - 42: {"x":5}
 - 43: "x"
 - 44: {"x":5}
 - 45: "x"
 - 46: {"x":5}
 - 47: "x"
 - 48: {"x":5}
 - 49: "x"
 - 50: {"x":5}
 - 51: "x"
 - 52: {"x":5}
 - 53: "x"
 - 54: {"x":5}
 - 55: "x"
 - 56: {"x":5}
 - 57: "x"
 - 58: {"x":5}
 - 59: "x"
 - 60: {"x":5}
 - 61: "x"
 - 62: {"x":5}
 - 63: "x"
 - 64: {"x":5}
 - 65: "x"
 - 66: {"x":5}
 - 67: "x"
 - 68: {"x":5}
 - 69: "x"
 - 70: {"x":5}
 - 71: "x"
 - 72: {"x":5}
 - 73: "x"
 - 74: {"x":5}
 - 75: "x"
 - 76: {"x":5}
 - 77: "x"
 - 78: {"x":5}
 - 79: "x"
 - 80: {"x":5}
 - 81: "x"
 - 82: {"x":5}
 - 83: "x"
 - 84: {"x":5}
 - 85: "x"
 - 86: {"x":5}
 - 87: "x"
 - 88: {"x":5}
 - 89: "x"
 - 90: {"x":5}
 - 91: "x"
 - 92: {"x":5}
 - 93: "x"
 - 94: {"x":5}
 - 95: "x"
 - 96: {"x":5}
 - 97: "x"
 - 98: {"x":5}
 - 99: "x"
 - 100: {"x":5}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
