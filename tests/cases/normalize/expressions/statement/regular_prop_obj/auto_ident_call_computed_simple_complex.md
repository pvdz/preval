# Preval test case

# auto_ident_call_computed_simple_complex.md

> normalize > expressions > statement > regular_prop_obj > auto_ident_call_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
b[$("$")](1).a;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpCompObj = tmpCallCompObj[tmpCallCompProp](1);
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpCompObj = tmpCallCompObj[tmpCallCompProp](1);
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same