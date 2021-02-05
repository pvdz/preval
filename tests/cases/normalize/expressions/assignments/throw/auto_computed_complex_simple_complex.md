# Preval test case

# auto_computed_complex_simple_complex.md

> normalize > expressions > assignments > throw > auto_computed_complex_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = { b: $(1) });
$(a)["b"] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
const tmpAssignMemLhsObj = $(a);
const tmpAssignComputedObj = tmpAssignMemLhsObj;
const tmpAssignComputedProp = 'b';
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
const tmpAssignMemLhsObj = $(a);
const tmpAssignComputedObj = tmpAssignMemLhsObj;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj.b = tmpAssignComputedRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ [object Object] ]>')

Normalized calls: Same

Final output calls: Same
