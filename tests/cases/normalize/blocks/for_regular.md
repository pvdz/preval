# Preval test case

# for_regular.md

> normalize > blocks > for_regular
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for ($(1); $(2); $(3)) $(4);
`````

## Normalized

`````js filename=intro
{
  $(1);
  while (true) {
    const tmpIfTest = $(2);
    if (tmpIfTest) {
      $(4);
      $(3);
    } else {
      break;
    }
  }
}
`````

## Output

`````js filename=intro
$(1);
while (true) {
  const tmpIfTest = $(2);
  if (tmpIfTest) {
    $(4);
    $(3);
  } else {
    break;
  }
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 4
 - 3: 3
 - 4: 2
 - 5: 4
 - 6: 3
 - 7: 2
 - 8: 4
 - 9: 3
 - 10: 2
 - 11: 4
 - 12: 3
 - 13: 2
 - 14: 4
 - 15: 3
 - 16: 2
 - 17: 4
 - 18: 3
 - 19: 2
 - 20: 4
 - 21: 3
 - 22: 2
 - 23: 4
 - 24: 3
 - 25: 2
 - 26: 4
 - 27: 3
 - 28: 2
 - 29: 4
 - 30: 3
 - 31: 2
 - 32: 4
 - 33: 3
 - 34: 2
 - 35: 4
 - 36: 3
 - 37: 2
 - 38: 4
 - 39: 3
 - 40: 2
 - 41: 4
 - 42: 3
 - 43: 2
 - 44: 4
 - 45: 3
 - 46: 2
 - 47: 4
 - 48: 3
 - 49: 2
 - 50: 4
 - 51: 3
 - 52: 2
 - 53: 4
 - 54: 3
 - 55: 2
 - 56: 4
 - 57: 3
 - 58: 2
 - 59: 4
 - 60: 3
 - 61: 2
 - 62: 4
 - 63: 3
 - 64: 2
 - 65: 4
 - 66: 3
 - 67: 2
 - 68: 4
 - 69: 3
 - 70: 2
 - 71: 4
 - 72: 3
 - 73: 2
 - 74: 4
 - 75: 3
 - 76: 2
 - 77: 4
 - 78: 3
 - 79: 2
 - 80: 4
 - 81: 3
 - 82: 2
 - 83: 4
 - 84: 3
 - 85: 2
 - 86: 4
 - 87: 3
 - 88: 2
 - 89: 4
 - 90: 3
 - 91: 2
 - 92: 4
 - 93: 3
 - 94: 2
 - 95: 4
 - 96: 3
 - 97: 2
 - 98: 4
 - 99: 3
 - 100: 2
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
