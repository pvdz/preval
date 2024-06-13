# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident computed c-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, $(b))[$("c")] = $(b)[$("d")])];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, $(b))[$(`c`)] = $(b)[$(`d`)])];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp$1];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 10, d: 20 };
const obj = {};
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp$1];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
obj[tmpNestedAssignPropRhs];
$(tmpNestedAssignPropRhs, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = {};
const c = $( a );
const d = $( "c" );
const e = $( a );
const f = $( "d" );
const g = e[ f ];
c[d] = g;
b[ g ];
$( g, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
