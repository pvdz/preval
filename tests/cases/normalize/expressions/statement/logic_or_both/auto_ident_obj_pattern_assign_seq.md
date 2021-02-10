# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> normalize > expressions > statement > logic_or_both > auto_ident_obj_pattern_assign_seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })) ||
  ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpIfTest;
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpIfTest = tmpNestedAssignObjPatternRhs;
if (tmpIfTest) {
} else {
  $(x);
  $(y);
  const tmpObjLitVal$2 = $(3);
  const tmpObjLitVal$3 = $(4);
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
  x = tmpAssignObjPatternRhs.x;
  y = tmpAssignObjPatternRhs.y;
}
$(a, x, y);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
