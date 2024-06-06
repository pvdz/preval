# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Export default > Auto ident prop complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
export default $(b).c = $(b)[$("d")];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ($(b).c = $(b)[$(`d`)]);
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpAnonDefaultExport = varInitAssignLhsComputedRhs;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpAnonDefaultExport = varInitAssignLhsComputedRhs;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
c: 10,
d: 20
;
const b = {
a: 999,
b: 1000
;
const c = $( a );
const d = $( a );
const e = $( "d" );
const f = d[ e ];
c.c = f;
const g = f;
export { g as default from "undefined"
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
