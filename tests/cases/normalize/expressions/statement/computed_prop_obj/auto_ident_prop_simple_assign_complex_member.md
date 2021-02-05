# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_prop_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
(b.c = $(b)[$("d")])["a"];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpCompObj$1 = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.c = tmpNestedPropAssignRhs;
tmpCompObj = tmpNestedPropAssignRhs;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
const tmpCompObj$1 = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.c = tmpNestedPropAssignRhs;
tmpCompObj = tmpNestedPropAssignRhs;
tmpCompObj.a;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
