# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > statement > do_while > auto_ident_object_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ({ x: $(1), y: 2, z: $(3) });
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
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$1 = 2;
    const tmpObjLitVal$2 = $(3);
    tmpIfTest = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
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
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$2 = $(3);
    tmpIfTest = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
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