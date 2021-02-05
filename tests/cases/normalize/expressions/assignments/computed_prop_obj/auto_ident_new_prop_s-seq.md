# Preval test case

# auto_ident_new_prop_s-seq.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_new_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = new (1, 2, b).$(1))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
1;
2;
const tmpCompObj$1 = b;
const tmpNewCallee = tmpCompObj$1.$;
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
const tmpCompObj$1 = b;
const tmpNewCallee = tmpCompObj$1.$;
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
