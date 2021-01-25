# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > while > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
while ([x, y] = ($(x), $(y), z));
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
while (true) {
  $(x);
  $(y);
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  const tmpIfTest = arrAssignPatternRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
while (true) {
  $(x);
  $(y);
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  const tmpIfTest = arrAssignPatternRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 10
 - 3: 20
 - 4: 10
 - 5: 20
 - 6: 10
 - 7: 20
 - 8: 10
 - 9: 20
 - 10: 10
 - 11: 20
 - 12: 10
 - 13: 20
 - 14: 10
 - 15: 20
 - 16: 10
 - 17: 20
 - 18: 10
 - 19: 20
 - 20: 10
 - 21: 20
 - 22: 10
 - 23: 20
 - 24: 10
 - 25: 20
 - 26: 10
 - 27: 20
 - 28: 10
 - 29: 20
 - 30: 10
 - 31: 20
 - 32: 10
 - 33: 20
 - 34: 10
 - 35: 20
 - 36: 10
 - 37: 20
 - 38: 10
 - 39: 20
 - 40: 10
 - 41: 20
 - 42: 10
 - 43: 20
 - 44: 10
 - 45: 20
 - 46: 10
 - 47: 20
 - 48: 10
 - 49: 20
 - 50: 10
 - 51: 20
 - 52: 10
 - 53: 20
 - 54: 10
 - 55: 20
 - 56: 10
 - 57: 20
 - 58: 10
 - 59: 20
 - 60: 10
 - 61: 20
 - 62: 10
 - 63: 20
 - 64: 10
 - 65: 20
 - 66: 10
 - 67: 20
 - 68: 10
 - 69: 20
 - 70: 10
 - 71: 20
 - 72: 10
 - 73: 20
 - 74: 10
 - 75: 20
 - 76: 10
 - 77: 20
 - 78: 10
 - 79: 20
 - 80: 10
 - 81: 20
 - 82: 10
 - 83: 20
 - 84: 10
 - 85: 20
 - 86: 10
 - 87: 20
 - 88: 10
 - 89: 20
 - 90: 10
 - 91: 20
 - 92: 10
 - 93: 20
 - 94: 10
 - 95: 20
 - 96: 10
 - 97: 20
 - 98: 10
 - 99: 20
 - 100: 10
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
