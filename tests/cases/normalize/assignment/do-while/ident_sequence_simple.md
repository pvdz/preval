# Preval test case

# ident_sequence_simple.md

> normalize > assignment > do-while > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a = ($(b), c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let n = 0;
do {
  {
    tmpPostfixArg = n;
    n = n + 1;
    tmpArg = tmpPostfixArg;
    let ifTestTmp_1 = $(tmpArg);
    if (ifTestTmp_1) {
      break;
    }
  }
  $(b);
  tmpNestedComplexRhs = c;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedComplexRhs;
let a = 1;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  $(2);
  tmpNestedComplexRhs = 3;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 3
 - 7: 2
 - 8: 4
 - 9: 2
 - 10: 5
 - 11: 2
 - 12: 6
 - 13: 2
 - 14: 7
 - 15: 2
 - 16: 8
 - 17: 2
 - 18: 9
 - 19: 2
 - 20: 10
 - 21: 2
 - 22: 11
 - 23: 2
 - 24: 12
 - 25: 2
 - 26: 13
 - 27: 2
 - 28: 14
 - 29: 2
 - 30: 15
 - 31: 2
 - 32: 16
 - 33: 2
 - 34: 17
 - 35: 2
 - 36: 18
 - 37: 2
 - 38: 19
 - 39: 2
 - 40: 20
 - 41: 2
 - 42: 21
 - 43: 2
 - 44: 22
 - 45: 2
 - 46: 23
 - 47: 2
 - 48: 24
 - 49: 2
 - 50: 25
 - 51: 2
 - 52: 26
 - 53: 2
 - 54: 27
 - 55: 2
 - 56: 28
 - 57: 2
 - 58: 29
 - 59: 2
 - 60: 30
 - 61: 2
 - 62: 31
 - 63: 2
 - 64: 32
 - 65: 2
 - 66: 33
 - 67: 2
 - 68: 34
 - 69: 2
 - 70: 35
 - 71: 2
 - 72: 36
 - 73: 2
 - 74: 37
 - 75: 2
 - 76: 38
 - 77: 2
 - 78: 39
 - 79: 2
 - 80: 40
 - 81: 2
 - 82: 41
 - 83: 2
 - 84: 42
 - 85: 2
 - 86: 43
 - 87: 2
 - 88: 44
 - 89: 2
 - 90: 45
 - 91: 2
 - 92: 46
 - 93: 2
 - 94: 47
 - 95: 2
 - 96: 48
 - 97: 2
 - 98: 49
 - 99: 2
 - 100: 50
 - 101: <crash[ Loop aborted by Preval test runner ]>

Normalized calls: Same

Final output calls: Same
