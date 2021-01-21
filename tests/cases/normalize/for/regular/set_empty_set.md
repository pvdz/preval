# Preval test case

# _base.md

> normalize > for > regular > _base
>
> Regular for-loop

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (a; ; c) $(d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  a;
  while (true) {
    $(d);
    c;
  }
}
`````

## Output

`````js filename=intro
while (true) {
  $(4);
}
`````

## Result

Should call `$` with:
 - 0: 4
 - 1: 4
 - 2: 4
 - 3: 4
 - 4: 4
 - 5: 4
 - 6: 4
 - 7: 4
 - 8: 4
 - 9: 4
 - 10: 4
 - 11: 4
 - 12: 4
 - 13: 4
 - 14: 4
 - 15: 4
 - 16: 4
 - 17: 4
 - 18: 4
 - 19: 4
 - 20: 4
 - 21: 4
 - 22: 4
 - 23: 4
 - 24: 4
 - 25: 4
 - 26: 4
 - 27: 4
 - 28: 4
 - 29: 4
 - 30: 4
 - 31: 4
 - 32: 4
 - 33: 4
 - 34: 4
 - 35: 4
 - 36: 4
 - 37: 4
 - 38: 4
 - 39: 4
 - 40: 4
 - 41: 4
 - 42: 4
 - 43: 4
 - 44: 4
 - 45: 4
 - 46: 4
 - 47: 4
 - 48: 4
 - 49: 4
 - 50: 4
 - 51: 4
 - 52: 4
 - 53: 4
 - 54: 4
 - 55: 4
 - 56: 4
 - 57: 4
 - 58: 4
 - 59: 4
 - 60: 4
 - 61: 4
 - 62: 4
 - 63: 4
 - 64: 4
 - 65: 4
 - 66: 4
 - 67: 4
 - 68: 4
 - 69: 4
 - 70: 4
 - 71: 4
 - 72: 4
 - 73: 4
 - 74: 4
 - 75: 4
 - 76: 4
 - 77: 4
 - 78: 4
 - 79: 4
 - 80: 4
 - 81: 4
 - 82: 4
 - 83: 4
 - 84: 4
 - 85: 4
 - 86: 4
 - 87: 4
 - 88: 4
 - 89: 4
 - 90: 4
 - 91: 4
 - 92: 4
 - 93: 4
 - 94: 4
 - 95: 4
 - 96: 4
 - 97: 4
 - 98: 4
 - 99: 4
 - 100: 4
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same