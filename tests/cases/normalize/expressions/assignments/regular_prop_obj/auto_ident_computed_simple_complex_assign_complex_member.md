# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident computed simple complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = b[$("c")] = $(b)[$("d")]).a;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
(a = b[$('c')] = $(b)[$('d')]).a;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $('c');
const tmpCompObj$1 = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
const tmpNestedAssignComMemberProp = $('c');
const b = { c: 10, d: 20 };
const tmpCompObj$1 = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
tmpNestedAssignPropRhs.a;
$(tmpNestedAssignPropRhs, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
