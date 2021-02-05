# Preval test case

# auto_computed_complex_complex_complex.md

> normalize > expressions > assignments > regular_prop_obj > auto_computed_complex_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = { b: $(1) }).a;
$(a)[$("b")] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $('b');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $('b');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 'b'
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
