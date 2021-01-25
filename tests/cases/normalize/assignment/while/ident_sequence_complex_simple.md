# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
while (a = ($(b), $(c)).x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = 2;
let c = 3;
while (true) {
  $(b);
  tmpNestedAssignObj = $(c);
  tmpNestedPropAssignRhs = c;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  const tmpIfTest = tmpNestedPropAssignRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
while (true) {
  $(2);
  tmpNestedAssignObj = $(3);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  const tmpIfTest = tmpNestedPropAssignRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 2
 - 3: 3
 - 4: 2
 - 5: 3
 - 6: 2
 - 7: 3
 - 8: 2
 - 9: 3
 - 10: 2
 - 11: 3
 - 12: 2
 - 13: 3
 - 14: 2
 - 15: 3
 - 16: 2
 - 17: 3
 - 18: 2
 - 19: 3
 - 20: 2
 - 21: 3
 - 22: 2
 - 23: 3
 - 24: 2
 - 25: 3
 - 26: 2
 - 27: 3
 - 28: 2
 - 29: 3
 - 30: 2
 - 31: 3
 - 32: 2
 - 33: 3
 - 34: 2
 - 35: 3
 - 36: 2
 - 37: 3
 - 38: 2
 - 39: 3
 - 40: 2
 - 41: 3
 - 42: 2
 - 43: 3
 - 44: 2
 - 45: 3
 - 46: 2
 - 47: 3
 - 48: 2
 - 49: 3
 - 50: 2
 - 51: 3
 - 52: 2
 - 53: 3
 - 54: 2
 - 55: 3
 - 56: 2
 - 57: 3
 - 58: 2
 - 59: 3
 - 60: 2
 - 61: 3
 - 62: 2
 - 63: 3
 - 64: 2
 - 65: 3
 - 66: 2
 - 67: 3
 - 68: 2
 - 69: 3
 - 70: 2
 - 71: 3
 - 72: 2
 - 73: 3
 - 74: 2
 - 75: 3
 - 76: 2
 - 77: 3
 - 78: 2
 - 79: 3
 - 80: 2
 - 81: 3
 - 82: 2
 - 83: 3
 - 84: 2
 - 85: 3
 - 86: 2
 - 87: 3
 - 88: 2
 - 89: 3
 - 90: 2
 - 91: 3
 - 92: 2
 - 93: 3
 - 94: 2
 - 95: 3
 - 96: 2
 - 97: 3
 - 98: 2
 - 99: 3
 - 100: 2
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
