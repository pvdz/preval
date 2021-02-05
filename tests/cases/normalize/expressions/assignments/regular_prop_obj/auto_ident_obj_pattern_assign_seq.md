# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_obj_pattern_assign_seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
let obj = {};
(a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })).a;
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
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
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
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
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a, x, y);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
