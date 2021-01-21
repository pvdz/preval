# Preval test case

# member_complex_bin.md

> normalize > assignment > while > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
while ($(a).x = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 2;
let c = 3;
while (true) {
  {
    let tmpBindInitMemberObject = $(a);
    let tmpBindInitRhs = b + c;
    tmpBindInitMemberObject.x = tmpBindInitRhs;
    let ifTestTmp = tmpBindInitRhs;
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
let a = { x: 10 };
while (true) {
  let tmpBindInitMemberObject = $(a);
  tmpBindInitMemberObject.x = 5;
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: {"x":5}
 - 2: {"x":5}
 - 3: {"x":5}
 - 4: {"x":5}
 - 5: {"x":5}
 - 6: {"x":5}
 - 7: {"x":5}
 - 8: {"x":5}
 - 9: {"x":5}
 - 10: {"x":5}
 - 11: {"x":5}
 - 12: {"x":5}
 - 13: {"x":5}
 - 14: {"x":5}
 - 15: {"x":5}
 - 16: {"x":5}
 - 17: {"x":5}
 - 18: {"x":5}
 - 19: {"x":5}
 - 20: {"x":5}
 - 21: {"x":5}
 - 22: {"x":5}
 - 23: {"x":5}
 - 24: {"x":5}
 - 25: {"x":5}
 - 26: {"x":5}
 - 27: {"x":5}
 - 28: {"x":5}
 - 29: {"x":5}
 - 30: {"x":5}
 - 31: {"x":5}
 - 32: {"x":5}
 - 33: {"x":5}
 - 34: {"x":5}
 - 35: {"x":5}
 - 36: {"x":5}
 - 37: {"x":5}
 - 38: {"x":5}
 - 39: {"x":5}
 - 40: {"x":5}
 - 41: {"x":5}
 - 42: {"x":5}
 - 43: {"x":5}
 - 44: {"x":5}
 - 45: {"x":5}
 - 46: {"x":5}
 - 47: {"x":5}
 - 48: {"x":5}
 - 49: {"x":5}
 - 50: {"x":5}
 - 51: {"x":5}
 - 52: {"x":5}
 - 53: {"x":5}
 - 54: {"x":5}
 - 55: {"x":5}
 - 56: {"x":5}
 - 57: {"x":5}
 - 58: {"x":5}
 - 59: {"x":5}
 - 60: {"x":5}
 - 61: {"x":5}
 - 62: {"x":5}
 - 63: {"x":5}
 - 64: {"x":5}
 - 65: {"x":5}
 - 66: {"x":5}
 - 67: {"x":5}
 - 68: {"x":5}
 - 69: {"x":5}
 - 70: {"x":5}
 - 71: {"x":5}
 - 72: {"x":5}
 - 73: {"x":5}
 - 74: {"x":5}
 - 75: {"x":5}
 - 76: {"x":5}
 - 77: {"x":5}
 - 78: {"x":5}
 - 79: {"x":5}
 - 80: {"x":5}
 - 81: {"x":5}
 - 82: {"x":5}
 - 83: {"x":5}
 - 84: {"x":5}
 - 85: {"x":5}
 - 86: {"x":5}
 - 87: {"x":5}
 - 88: {"x":5}
 - 89: {"x":5}
 - 90: {"x":5}
 - 91: {"x":5}
 - 92: {"x":5}
 - 93: {"x":5}
 - 94: {"x":5}
 - 95: {"x":5}
 - 96: {"x":5}
 - 97: {"x":5}
 - 98: {"x":5}
 - 99: {"x":5}
 - 100: {"x":5}
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
