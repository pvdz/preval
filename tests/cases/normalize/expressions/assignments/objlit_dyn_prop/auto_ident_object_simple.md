# Preval test case

# auto_ident_object_simple.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_object_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = { x: 1, y: 2, z: 3 })]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
const tmpNestedComplexRhs = { x: 1, y: 2, z: 3 };
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
const tmpNestedComplexRhs = { x: 1, y: 2, z: 3 };
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { '[object Object]': '10' }
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
