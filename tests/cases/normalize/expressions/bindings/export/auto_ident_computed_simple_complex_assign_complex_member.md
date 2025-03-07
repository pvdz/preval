# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Bindings > Export > Auto ident computed simple complex assign complex member
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

export let a = (b[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Settled


`````js filename=intro
const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const a /*:unknown*/ = varInitAssignLhsComputedRhs;
export { a };
$(varInitAssignLhsComputedRhs, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const a = varInitAssignLhsComputedRhs;
export { a };
$(varInitAssignLhsComputedRhs, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = (b[$(`c`)] = $(b)[$(`d`)]);
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
const f = e;
export { f as a };
$( e, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
