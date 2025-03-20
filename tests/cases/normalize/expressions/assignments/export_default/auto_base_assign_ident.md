# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Export default > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = b = $(2);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
const tmpAnonDefaultExport /*:unknown*/ = tmpNestedComplexRhs;
export { tmpAnonDefaultExport as default };
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
const tmpAnonDefaultExport = tmpNestedComplexRhs;
export { tmpAnonDefaultExport as default };
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = a;
export { b as default };
$( a, a );
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
