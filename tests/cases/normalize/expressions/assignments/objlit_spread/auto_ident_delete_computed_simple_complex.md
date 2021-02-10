# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > assignments > objlit_spread > auto_ident_delete_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$({ ...(a = delete x[$("y")]) });
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjSpread;
const tmpDeleteCompObj = x;
const tmpDeleteCompProp = $('y');
const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
a = tmpNestedComplexRhs;
tmpObjSpread = tmpNestedComplexRhs;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'y'
 - 2: {}
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
