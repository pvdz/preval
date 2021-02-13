# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > assignments > logic_or_both > auto_ident_object_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) || (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$2 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpObjLitVal$3 = $(1);
  const tmpObjLitVal$4 = 2;
  const tmpObjLitVal$5 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal$3, y: tmpObjLitVal$4, z: tmpObjLitVal$5 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpObjLitVal$3 = $(1);
  const tmpObjLitVal$5 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal$3, y: 2, z: tmpObjLitVal$5 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - 4: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same