# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = { x: $(1), y: 2, z: $(3) }); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = { x: $(1), y: 2, z: $(3) });
  while (true) {
    $(xyz);
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
const tmpObjLitVal$2 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
const SSA_a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
while (true) {
  $(SSA_a);
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
 - 3: { x: '1', y: '2', z: '3' }
 - 4: 1
 - 5: { x: '1', y: '2', z: '3' }
 - 6: 1
 - 7: { x: '1', y: '2', z: '3' }
 - 8: 1
 - 9: { x: '1', y: '2', z: '3' }
 - 10: 1
 - 11: { x: '1', y: '2', z: '3' }
 - 12: 1
 - 13: { x: '1', y: '2', z: '3' }
 - 14: 1
 - 15: { x: '1', y: '2', z: '3' }
 - 16: 1
 - 17: { x: '1', y: '2', z: '3' }
 - 18: 1
 - 19: { x: '1', y: '2', z: '3' }
 - 20: 1
 - 21: { x: '1', y: '2', z: '3' }
 - 22: 1
 - 23: { x: '1', y: '2', z: '3' }
 - 24: 1
 - 25: { x: '1', y: '2', z: '3' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
