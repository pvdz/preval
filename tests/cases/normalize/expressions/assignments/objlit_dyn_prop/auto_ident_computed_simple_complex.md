# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$({ [(a = b[$("c")])]: 10 });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpObjLitPropKey = a;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { 1: '10' }
 - 3: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same