# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > assignments > ternary_c > auto_ident_object_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = 2;
  const tmpObjLitVal$2 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$2 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 3
 - 4: { x: '1', y: '2', z: '3' }
 - 5: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
