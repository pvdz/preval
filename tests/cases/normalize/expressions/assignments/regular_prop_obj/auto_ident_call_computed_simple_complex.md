# Preval test case

# auto_ident_call_computed_simple_complex.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_call_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = b[$("$")](1)).a;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
