# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let a = 1, b = [10, 20], x = 3, y = 4, p, q;
do { [p, q] = $(b); } while (x + y);
$(p, q);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpDoWhileTest;
let a = 1;
let b = [10, 20];
let x = 3;
let y = 4;
let p;
let q;
do {
  arrAssignPatternRhs = $(b);
  arrPatternSplat = [...arrAssignPatternRhs];
  p = arrPatternSplat[0];
  q = arrPatternSplat[1];
  arrAssignPatternRhs;
  tmpDoWhileTest = x + y;
} while (tmpDoWhileTest);
$(p, q);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpDoWhileTest;
let b = [10, 20];
let p;
let q;
do {
  arrAssignPatternRhs = $(b);
  arrPatternSplat = [...arrAssignPatternRhs];
  p = arrPatternSplat[0];
  q = arrPatternSplat[1];
  tmpDoWhileTest = 7;
} while (tmpDoWhileTest);
$(p, q);
`````

## Result

Should call `$` with:
 - 0: [10,20]
 - 1: [10,20]
 - 2: [10,20]
 - 3: [10,20]
 - 4: [10,20]
 - 5: [10,20]
 - 6: [10,20]
 - 7: [10,20]
 - 8: [10,20]
 - 9: [10,20]
 - 10: [10,20]
 - 11: [10,20]
 - 12: [10,20]
 - 13: [10,20]
 - 14: [10,20]
 - 15: [10,20]
 - 16: [10,20]
 - 17: [10,20]
 - 18: [10,20]
 - 19: [10,20]
 - 20: [10,20]
 - 21: [10,20]
 - 22: [10,20]
 - 23: [10,20]
 - 24: [10,20]
 - 25: [10,20]
 - 26: [10,20]
 - 27: [10,20]
 - 28: [10,20]
 - 29: [10,20]
 - 30: [10,20]
 - 31: [10,20]
 - 32: [10,20]
 - 33: [10,20]
 - 34: [10,20]
 - 35: [10,20]
 - 36: [10,20]
 - 37: [10,20]
 - 38: [10,20]
 - 39: [10,20]
 - 40: [10,20]
 - 41: [10,20]
 - 42: [10,20]
 - 43: [10,20]
 - 44: [10,20]
 - 45: [10,20]
 - 46: [10,20]
 - 47: [10,20]
 - 48: [10,20]
 - 49: [10,20]
 - 50: [10,20]
 - 51: [10,20]
 - 52: [10,20]
 - 53: [10,20]
 - 54: [10,20]
 - 55: [10,20]
 - 56: [10,20]
 - 57: [10,20]
 - 58: [10,20]
 - 59: [10,20]
 - 60: [10,20]
 - 61: [10,20]
 - 62: [10,20]
 - 63: [10,20]
 - 64: [10,20]
 - 65: [10,20]
 - 66: [10,20]
 - 67: [10,20]
 - 68: [10,20]
 - 69: [10,20]
 - 70: [10,20]
 - 71: [10,20]
 - 72: [10,20]
 - 73: [10,20]
 - 74: [10,20]
 - 75: [10,20]
 - 76: [10,20]
 - 77: [10,20]
 - 78: [10,20]
 - 79: [10,20]
 - 80: [10,20]
 - 81: [10,20]
 - 82: [10,20]
 - 83: [10,20]
 - 84: [10,20]
 - 85: [10,20]
 - 86: [10,20]
 - 87: [10,20]
 - 88: [10,20]
 - 89: [10,20]
 - 90: [10,20]
 - 91: [10,20]
 - 92: [10,20]
 - 93: [10,20]
 - 94: [10,20]
 - 95: [10,20]
 - 96: [10,20]
 - 97: [10,20]
 - 98: [10,20]
 - 99: [10,20]
 - 100: [10,20]
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
