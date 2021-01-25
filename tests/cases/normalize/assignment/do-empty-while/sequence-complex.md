# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
do {} while ((a, $(b)).c = d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
while (true) {
  a;
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemLhsObj.c = d;
  const tmpIfTest = d;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
let b = { c: 2 };
while (true) {
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemLhsObj.c = 3;
}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {"c":3}
 - 2: {"c":3}
 - 3: {"c":3}
 - 4: {"c":3}
 - 5: {"c":3}
 - 6: {"c":3}
 - 7: {"c":3}
 - 8: {"c":3}
 - 9: {"c":3}
 - 10: {"c":3}
 - 11: {"c":3}
 - 12: {"c":3}
 - 13: {"c":3}
 - 14: {"c":3}
 - 15: {"c":3}
 - 16: {"c":3}
 - 17: {"c":3}
 - 18: {"c":3}
 - 19: {"c":3}
 - 20: {"c":3}
 - 21: {"c":3}
 - 22: {"c":3}
 - 23: {"c":3}
 - 24: {"c":3}
 - 25: {"c":3}
 - 26: {"c":3}
 - 27: {"c":3}
 - 28: {"c":3}
 - 29: {"c":3}
 - 30: {"c":3}
 - 31: {"c":3}
 - 32: {"c":3}
 - 33: {"c":3}
 - 34: {"c":3}
 - 35: {"c":3}
 - 36: {"c":3}
 - 37: {"c":3}
 - 38: {"c":3}
 - 39: {"c":3}
 - 40: {"c":3}
 - 41: {"c":3}
 - 42: {"c":3}
 - 43: {"c":3}
 - 44: {"c":3}
 - 45: {"c":3}
 - 46: {"c":3}
 - 47: {"c":3}
 - 48: {"c":3}
 - 49: {"c":3}
 - 50: {"c":3}
 - 51: {"c":3}
 - 52: {"c":3}
 - 53: {"c":3}
 - 54: {"c":3}
 - 55: {"c":3}
 - 56: {"c":3}
 - 57: {"c":3}
 - 58: {"c":3}
 - 59: {"c":3}
 - 60: {"c":3}
 - 61: {"c":3}
 - 62: {"c":3}
 - 63: {"c":3}
 - 64: {"c":3}
 - 65: {"c":3}
 - 66: {"c":3}
 - 67: {"c":3}
 - 68: {"c":3}
 - 69: {"c":3}
 - 70: {"c":3}
 - 71: {"c":3}
 - 72: {"c":3}
 - 73: {"c":3}
 - 74: {"c":3}
 - 75: {"c":3}
 - 76: {"c":3}
 - 77: {"c":3}
 - 78: {"c":3}
 - 79: {"c":3}
 - 80: {"c":3}
 - 81: {"c":3}
 - 82: {"c":3}
 - 83: {"c":3}
 - 84: {"c":3}
 - 85: {"c":3}
 - 86: {"c":3}
 - 87: {"c":3}
 - 88: {"c":3}
 - 89: {"c":3}
 - 90: {"c":3}
 - 91: {"c":3}
 - 92: {"c":3}
 - 93: {"c":3}
 - 94: {"c":3}
 - 95: {"c":3}
 - 96: {"c":3}
 - 97: {"c":3}
 - 98: {"c":3}
 - 99: {"c":3}
 - 100: {"c":3}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
