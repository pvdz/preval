# Preval test case

# auto_computed_complex_simple_simple.md

> normalize > expressions > assignments > let > auto_computed_complex_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = { b: $(1) });
$(xyz);
$(a)["b"] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
xyz = tmpNestedComplexRhs;
$(xyz);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj['b'] = 2;
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
