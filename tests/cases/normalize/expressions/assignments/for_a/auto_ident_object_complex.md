# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > For a > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (a = { x: $(1), y: 2, z: $(3) }; ; $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = { x: $(1), y: 2, z: $(3) };
  while (true) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
while (true) {
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const SSA_a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
while (true) {
  $(1);
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
