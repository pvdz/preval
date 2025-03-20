# Preval test case

# auto_computed_complex_simple_complex.md

> Normalize > Expressions > Assignments > Export default > Auto computed complex simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = { b: $(1) };
$(a)["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpAnonDefaultExport /*:unknown*/ = a;
export { tmpAnonDefaultExport as default };
const tmpAssignMemLhsObj /*:unknown*/ = $(a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
const c = b;
export { c as default };
const d = $( b );
const e = $( 2 );
d.b = e;
$( b );
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
