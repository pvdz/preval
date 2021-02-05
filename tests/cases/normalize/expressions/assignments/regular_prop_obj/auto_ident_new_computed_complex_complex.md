# Preval test case

# auto_ident_new_computed_complex_complex.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_new_computed_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = new ($(b)[$("$")])(1)).a;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpCompObj$1 = $(b);
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj$1[tmpCompProp];
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
const tmpCompObj$1 = $(b);
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj$1[tmpCompProp];
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
