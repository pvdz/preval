# Preval test case

# auto_ident_computed_complex_complex.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_computed_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = $(b)[$("c")])["a"];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpCompObj$1 = $(b);
const tmpCompProp = $('c');
const tmpNestedComplexRhs = tmpCompObj$1[tmpCompProp];
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
