# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Bindings > Export > Auto ident prop complex assign complex member
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

export let a = ($(b).c = $(b)[$("d")]);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = ($(b).c = $(b)[$(`d`)]);
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b);
`````

## Output


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const a /*:unknown*/ = varInitAssignLhsComputedRhs;
export { a };
$(varInitAssignLhsComputedRhs, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
const f = e;
export { f as a };
$( e, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
