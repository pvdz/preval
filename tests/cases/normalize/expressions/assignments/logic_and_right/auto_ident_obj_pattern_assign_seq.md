# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> normalize > expressions > assignments > logic_and_right > auto_ident_obj_pattern_assign_seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$($(100) && (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, x, y);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: { x: '3', y: '4' }
 - 7: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same