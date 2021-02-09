# Preval test case

# auto_prop_complex_simple.md

> normalize > expressions > assignments > if > auto_prop_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = { b: $(1) }));
$(a).b = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
