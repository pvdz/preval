# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_new_computed_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new (1, 2, $(b))["$"](1))];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
1;
2;
const tmpCompObj$1 = $(b);
const tmpNewCallee = tmpCompObj$1.$;
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
const tmpCompObj$1 = $(b);
const tmpNewCallee = tmpCompObj$1.$;
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
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
