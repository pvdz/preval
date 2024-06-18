# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident prop c-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[((1, 2, $(b)).c = $(b)[$("d")])];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[((1, 2, $(b)).c = $(b)[$(`d`)])];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpCompProp = varInitAssignLhsComputedRhs;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const obj = {};
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
obj[varInitAssignLhsComputedRhs];
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = {
  a: 999,
  b: 1000,
};
const c = {};
const d = $( a );
const e = $( a );
const f = $( "d" );
const g = e[ f ];
d.c = g;
c[ g ];
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
