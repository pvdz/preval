# Preval test case

# auto_computed_simple_simple_complex.md

> normalize > expressions > assignments > computed_prop_prop > auto_computed_simple_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { b: $(1) })];
a["b"] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
const tmpAssignComputedObj = a;
const tmpAssignComputedProp = 'b';
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
const tmpAssignComputedObj = a;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj.b = tmpAssignComputedRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
