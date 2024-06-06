# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Export default > Auto ident computed simple simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
export default a = b["c"] = $(b)[$("d")];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = b[`c`] = $(b)[$(`d`)]);
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b.c = tmpNestedAssignPropRhs;
const tmpAnonDefaultExport = tmpNestedAssignPropRhs;
export { tmpAnonDefaultExport as default };
$(tmpNestedAssignPropRhs, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
c: 10,
d: 20
;
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
const e = d;
export { e as default from "undefined"
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
