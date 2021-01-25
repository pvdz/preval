# Preval test case

# member_complex_simple.md

> normalize > assignment > for-b > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (;$(a).x = b;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  while (true) {
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemLhsObj.x = b;
    const tmpIfTest = b;
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
var tmpAssignMemLhsObj;
let a = { x: 10 };
while (true) {
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemLhsObj.x = 2;
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: {"x":2}
 - 2: {"x":2}
 - 3: {"x":2}
 - 4: {"x":2}
 - 5: {"x":2}
 - 6: {"x":2}
 - 7: {"x":2}
 - 8: {"x":2}
 - 9: {"x":2}
 - 10: {"x":2}
 - 11: {"x":2}
 - 12: {"x":2}
 - 13: {"x":2}
 - 14: {"x":2}
 - 15: {"x":2}
 - 16: {"x":2}
 - 17: {"x":2}
 - 18: {"x":2}
 - 19: {"x":2}
 - 20: {"x":2}
 - 21: {"x":2}
 - 22: {"x":2}
 - 23: {"x":2}
 - 24: {"x":2}
 - 25: {"x":2}
 - 26: {"x":2}
 - 27: {"x":2}
 - 28: {"x":2}
 - 29: {"x":2}
 - 30: {"x":2}
 - 31: {"x":2}
 - 32: {"x":2}
 - 33: {"x":2}
 - 34: {"x":2}
 - 35: {"x":2}
 - 36: {"x":2}
 - 37: {"x":2}
 - 38: {"x":2}
 - 39: {"x":2}
 - 40: {"x":2}
 - 41: {"x":2}
 - 42: {"x":2}
 - 43: {"x":2}
 - 44: {"x":2}
 - 45: {"x":2}
 - 46: {"x":2}
 - 47: {"x":2}
 - 48: {"x":2}
 - 49: {"x":2}
 - 50: {"x":2}
 - 51: {"x":2}
 - 52: {"x":2}
 - 53: {"x":2}
 - 54: {"x":2}
 - 55: {"x":2}
 - 56: {"x":2}
 - 57: {"x":2}
 - 58: {"x":2}
 - 59: {"x":2}
 - 60: {"x":2}
 - 61: {"x":2}
 - 62: {"x":2}
 - 63: {"x":2}
 - 64: {"x":2}
 - 65: {"x":2}
 - 66: {"x":2}
 - 67: {"x":2}
 - 68: {"x":2}
 - 69: {"x":2}
 - 70: {"x":2}
 - 71: {"x":2}
 - 72: {"x":2}
 - 73: {"x":2}
 - 74: {"x":2}
 - 75: {"x":2}
 - 76: {"x":2}
 - 77: {"x":2}
 - 78: {"x":2}
 - 79: {"x":2}
 - 80: {"x":2}
 - 81: {"x":2}
 - 82: {"x":2}
 - 83: {"x":2}
 - 84: {"x":2}
 - 85: {"x":2}
 - 86: {"x":2}
 - 87: {"x":2}
 - 88: {"x":2}
 - 89: {"x":2}
 - 90: {"x":2}
 - 91: {"x":2}
 - 92: {"x":2}
 - 93: {"x":2}
 - 94: {"x":2}
 - 95: {"x":2}
 - 96: {"x":2}
 - 97: {"x":2}
 - 98: {"x":2}
 - 99: {"x":2}
 - 100: {"x":2}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
