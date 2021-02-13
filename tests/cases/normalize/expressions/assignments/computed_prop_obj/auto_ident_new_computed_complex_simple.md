# Preval test case

# auto_ident_new_computed_complex_simple.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_new_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = new ($(b)["$"])(1))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = $(b);
const tmpNewCallee = tmpCompObj$1.$;
a = new tmpNewCallee(1);
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = $(b);
const tmpNewCallee = tmpCompObj$1.$;
a = new tmpNewCallee(1);
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same