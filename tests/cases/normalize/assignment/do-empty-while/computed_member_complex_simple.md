# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > do-while > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
do {} while ($(a)[$('x')] = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
while (true) {
  {
    {
      tmpAssignComputedObj = $(a);
      tmpAssignComputedProp = $('x');
      tmpAssignComputedRhs = b;
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    }
    let ifTestTmp = b;
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
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
while (true) {
  tmpAssignComputedObj = $(a);
  tmpAssignComputedProp = $('x');
  tmpAssignComputedRhs = 2;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: "x"
 - 2: {"x":2}
 - 3: "x"
 - 4: {"x":2}
 - 5: "x"
 - 6: {"x":2}
 - 7: "x"
 - 8: {"x":2}
 - 9: "x"
 - 10: {"x":2}
 - 11: "x"
 - 12: {"x":2}
 - 13: "x"
 - 14: {"x":2}
 - 15: "x"
 - 16: {"x":2}
 - 17: "x"
 - 18: {"x":2}
 - 19: "x"
 - 20: {"x":2}
 - 21: "x"
 - 22: {"x":2}
 - 23: "x"
 - 24: {"x":2}
 - 25: "x"
 - 26: {"x":2}
 - 27: "x"
 - 28: {"x":2}
 - 29: "x"
 - 30: {"x":2}
 - 31: "x"
 - 32: {"x":2}
 - 33: "x"
 - 34: {"x":2}
 - 35: "x"
 - 36: {"x":2}
 - 37: "x"
 - 38: {"x":2}
 - 39: "x"
 - 40: {"x":2}
 - 41: "x"
 - 42: {"x":2}
 - 43: "x"
 - 44: {"x":2}
 - 45: "x"
 - 46: {"x":2}
 - 47: "x"
 - 48: {"x":2}
 - 49: "x"
 - 50: {"x":2}
 - 51: "x"
 - 52: {"x":2}
 - 53: "x"
 - 54: {"x":2}
 - 55: "x"
 - 56: {"x":2}
 - 57: "x"
 - 58: {"x":2}
 - 59: "x"
 - 60: {"x":2}
 - 61: "x"
 - 62: {"x":2}
 - 63: "x"
 - 64: {"x":2}
 - 65: "x"
 - 66: {"x":2}
 - 67: "x"
 - 68: {"x":2}
 - 69: "x"
 - 70: {"x":2}
 - 71: "x"
 - 72: {"x":2}
 - 73: "x"
 - 74: {"x":2}
 - 75: "x"
 - 76: {"x":2}
 - 77: "x"
 - 78: {"x":2}
 - 79: "x"
 - 80: {"x":2}
 - 81: "x"
 - 82: {"x":2}
 - 83: "x"
 - 84: {"x":2}
 - 85: "x"
 - 86: {"x":2}
 - 87: "x"
 - 88: {"x":2}
 - 89: "x"
 - 90: {"x":2}
 - 91: "x"
 - 92: {"x":2}
 - 93: "x"
 - 94: {"x":2}
 - 95: "x"
 - 96: {"x":2}
 - 97: "x"
 - 98: {"x":2}
 - 99: "x"
 - 100: {"x":2}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
