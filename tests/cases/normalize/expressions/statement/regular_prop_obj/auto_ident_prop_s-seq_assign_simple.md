# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > statement > regular_prop_obj > auto_ident_prop_s-seq_assign_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
((1, 2, b).c = 2).a;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpCompObj = tmpNestedPropAssignRhs;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
tmpCompObj = 2;
tmpCompObj.a;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
