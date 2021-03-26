# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = { x: $(1), y: 2, z: $(3) }) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = { x: $(1), y: 2, z: $(3) }) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = 2;
  const tmpObjLitVal$3 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$3 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: { x: '1', y: '2', z: '3' }
 - 5: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
