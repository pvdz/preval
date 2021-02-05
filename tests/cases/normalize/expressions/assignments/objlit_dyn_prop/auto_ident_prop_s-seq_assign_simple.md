# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_prop_s-seq_assign_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$({ [(a = (1, 2, b).c = 2)]: 10 });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
let tmpNestedComplexRhs;
1;
2;
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { 2: '10' }
 - 2: 2, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
