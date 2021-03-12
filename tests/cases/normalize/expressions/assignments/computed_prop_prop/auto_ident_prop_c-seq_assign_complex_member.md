# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident prop c-seq assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, $(b)).c = $(b)[$("d")])];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, $(b)).c = $(b)[$('d')])];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpNestedAssignObj = $(b);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp$1];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const obj = {};
const tmpNestedAssignObj = $(b);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp$1];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
obj[tmpNestedAssignPropRhs];
$(tmpNestedAssignPropRhs, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
