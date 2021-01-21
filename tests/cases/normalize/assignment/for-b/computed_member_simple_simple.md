# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > for-b > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (;a[$('x')] = b;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  while (true) {
    {
      tmpAssignComMemLhsObj = a;
      tmpAssignComMemLhsProp = $('x');
      tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = b;
      let ifTestTmp = b;
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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
while (true) {
  tmpAssignComMemLhsObj = a;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "x"
 - 2: "x"
 - 3: "x"
 - 4: "x"
 - 5: "x"
 - 6: "x"
 - 7: "x"
 - 8: "x"
 - 9: "x"
 - 10: "x"
 - 11: "x"
 - 12: "x"
 - 13: "x"
 - 14: "x"
 - 15: "x"
 - 16: "x"
 - 17: "x"
 - 18: "x"
 - 19: "x"
 - 20: "x"
 - 21: "x"
 - 22: "x"
 - 23: "x"
 - 24: "x"
 - 25: "x"
 - 26: "x"
 - 27: "x"
 - 28: "x"
 - 29: "x"
 - 30: "x"
 - 31: "x"
 - 32: "x"
 - 33: "x"
 - 34: "x"
 - 35: "x"
 - 36: "x"
 - 37: "x"
 - 38: "x"
 - 39: "x"
 - 40: "x"
 - 41: "x"
 - 42: "x"
 - 43: "x"
 - 44: "x"
 - 45: "x"
 - 46: "x"
 - 47: "x"
 - 48: "x"
 - 49: "x"
 - 50: "x"
 - 51: "x"
 - 52: "x"
 - 53: "x"
 - 54: "x"
 - 55: "x"
 - 56: "x"
 - 57: "x"
 - 58: "x"
 - 59: "x"
 - 60: "x"
 - 61: "x"
 - 62: "x"
 - 63: "x"
 - 64: "x"
 - 65: "x"
 - 66: "x"
 - 67: "x"
 - 68: "x"
 - 69: "x"
 - 70: "x"
 - 71: "x"
 - 72: "x"
 - 73: "x"
 - 74: "x"
 - 75: "x"
 - 76: "x"
 - 77: "x"
 - 78: "x"
 - 79: "x"
 - 80: "x"
 - 81: "x"
 - 82: "x"
 - 83: "x"
 - 84: "x"
 - 85: "x"
 - 86: "x"
 - 87: "x"
 - 88: "x"
 - 89: "x"
 - 90: "x"
 - 91: "x"
 - 92: "x"
 - 93: "x"
 - 94: "x"
 - 95: "x"
 - 96: "x"
 - 97: "x"
 - 98: "x"
 - 99: "x"
 - 100: "x"
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
