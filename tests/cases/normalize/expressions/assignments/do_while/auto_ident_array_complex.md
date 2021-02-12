# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > do_while > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = [$(1), 2, $(3)]));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpArrElement = $(1);
    const tmpArrElement$1 = 2;
    const tmpArrElement$2 = $(3);
    const tmpNestedComplexRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpArrElement = $(1);
    const tmpArrElement$1 = 2;
    const tmpArrElement$2 = $(3);
    const tmpNestedComplexRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 3
 - 4: 100
 - 5: 1
 - 6: 3
 - 7: 100
 - 8: 1
 - 9: 3
 - 10: 100
 - 11: 1
 - 12: 3
 - 13: 100
 - 14: 1
 - 15: 3
 - 16: 100
 - 17: 1
 - 18: 3
 - 19: 100
 - 20: 1
 - 21: 3
 - 22: 100
 - 23: 1
 - 24: 3
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
