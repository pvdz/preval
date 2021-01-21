# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > for-b > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
for (;[x, y] = ($(x), $(y), $(z)););
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  while (true) {
    {
      $(x);
      $(y);
      arrAssignPatternRhs = $(z);
      arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
      y = arrPatternSplat[1];
      let ifTestTmp = arrAssignPatternRhs;
      if (ifTestTmp) {
      } else {
        break;
      }
    }
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
  arrAssignPatternRhs = $(z);
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  let ifTestTmp = arrAssignPatternRhs;
  if (ifTestTmp) {
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
 - 2: [10,20,30]
 - 3: 10
 - 4: 20
 - 5: [10,20,30]
 - 6: 10
 - 7: 20
 - 8: [10,20,30]
 - 9: 10
 - 10: 20
 - 11: [10,20,30]
 - 12: 10
 - 13: 20
 - 14: [10,20,30]
 - 15: 10
 - 16: 20
 - 17: [10,20,30]
 - 18: 10
 - 19: 20
 - 20: [10,20,30]
 - 21: 10
 - 22: 20
 - 23: [10,20,30]
 - 24: 10
 - 25: 20
 - 26: [10,20,30]
 - 27: 10
 - 28: 20
 - 29: [10,20,30]
 - 30: 10
 - 31: 20
 - 32: [10,20,30]
 - 33: 10
 - 34: 20
 - 35: [10,20,30]
 - 36: 10
 - 37: 20
 - 38: [10,20,30]
 - 39: 10
 - 40: 20
 - 41: [10,20,30]
 - 42: 10
 - 43: 20
 - 44: [10,20,30]
 - 45: 10
 - 46: 20
 - 47: [10,20,30]
 - 48: 10
 - 49: 20
 - 50: [10,20,30]
 - 51: 10
 - 52: 20
 - 53: [10,20,30]
 - 54: 10
 - 55: 20
 - 56: [10,20,30]
 - 57: 10
 - 58: 20
 - 59: [10,20,30]
 - 60: 10
 - 61: 20
 - 62: [10,20,30]
 - 63: 10
 - 64: 20
 - 65: [10,20,30]
 - 66: 10
 - 67: 20
 - 68: [10,20,30]
 - 69: 10
 - 70: 20
 - 71: [10,20,30]
 - 72: 10
 - 73: 20
 - 74: [10,20,30]
 - 75: 10
 - 76: 20
 - 77: [10,20,30]
 - 78: 10
 - 79: 20
 - 80: [10,20,30]
 - 81: 10
 - 82: 20
 - 83: [10,20,30]
 - 84: 10
 - 85: 20
 - 86: [10,20,30]
 - 87: 10
 - 88: 20
 - 89: [10,20,30]
 - 90: 10
 - 91: 20
 - 92: [10,20,30]
 - 93: 10
 - 94: 20
 - 95: [10,20,30]
 - 96: 10
 - 97: 20
 - 98: [10,20,30]
 - 99: 10
 - 100: 20
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
