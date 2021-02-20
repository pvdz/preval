# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > While > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ({ x: $(1), y: 2, z: $(3) }) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = 2;
  const tmpObjLitVal$2 = $(3);
  const tmpIfTest = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
while (true) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$2 = $(3);
  const tmpIfTest = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 100
 - 4: 1
 - 5: 3
 - 6: 100
 - 7: 1
 - 8: 3
 - 9: 100
 - 10: 1
 - 11: 3
 - 12: 100
 - 13: 1
 - 14: 3
 - 15: 100
 - 16: 1
 - 17: 3
 - 18: 100
 - 19: 1
 - 20: 3
 - 21: 100
 - 22: 1
 - 23: 3
 - 24: 100
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
