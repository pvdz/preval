# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_prop_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b.c = $(b)[$("d")])];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
let tmpNestedComplexRhs;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
let tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp$1];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.c = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
