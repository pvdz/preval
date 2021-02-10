# Preval test case

# auto_computed_complex_simple_simple.md

> normalize > expressions > assignments > objlit_init > auto_computed_complex_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { b: $(1) }) });
$(a)["b"] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitVal;
const tmpObjLitVal$1 = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
a = tmpNestedComplexRhs;
tmpObjLitVal = tmpNestedComplexRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
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
 - 2: { x: '{"b":"1"}' }
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
