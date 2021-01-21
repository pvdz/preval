# Preval test case

# while.md

> normalize > blocks > while
>
> Add blocks to sub-statements

#TODO

## Input

`````js filename=intro
while ($(1)) $(2);
`````

## Normalized

`````js filename=intro
while (true) {
  {
    let ifTestTmp = $(1);
    if (ifTestTmp) {
      $(2);
    } else {
      break;
    }
  }
}
`````

## Output

`````js filename=intro
while (true) {
  let ifTestTmp = $(1);
  if (ifTestTmp) {
    $(2);
  } else {
    break;
  }
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 2
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 2
 - 26: 1
 - 27: 2
 - 28: 1
 - 29: 2
 - 30: 1
 - 31: 2
 - 32: 1
 - 33: 2
 - 34: 1
 - 35: 2
 - 36: 1
 - 37: 2
 - 38: 1
 - 39: 2
 - 40: 1
 - 41: 2
 - 42: 1
 - 43: 2
 - 44: 1
 - 45: 2
 - 46: 1
 - 47: 2
 - 48: 1
 - 49: 2
 - 50: 1
 - 51: 2
 - 52: 1
 - 53: 2
 - 54: 1
 - 55: 2
 - 56: 1
 - 57: 2
 - 58: 1
 - 59: 2
 - 60: 1
 - 61: 2
 - 62: 1
 - 63: 2
 - 64: 1
 - 65: 2
 - 66: 1
 - 67: 2
 - 68: 1
 - 69: 2
 - 70: 1
 - 71: 2
 - 72: 1
 - 73: 2
 - 74: 1
 - 75: 2
 - 76: 1
 - 77: 2
 - 78: 1
 - 79: 2
 - 80: 1
 - 81: 2
 - 82: 1
 - 83: 2
 - 84: 1
 - 85: 2
 - 86: 1
 - 87: 2
 - 88: 1
 - 89: 2
 - 90: 1
 - 91: 2
 - 92: 1
 - 93: 2
 - 94: 1
 - 95: 2
 - 96: 1
 - 97: 2
 - 98: 1
 - 99: 2
 - 100: 1
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
