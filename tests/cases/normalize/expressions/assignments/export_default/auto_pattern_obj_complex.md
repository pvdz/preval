# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Export default > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
export default { a } = $({ a: 1, b: 2 });
$(a);
`````


## Settled


`````js filename=intro
let tmpAnonDefaultExport /*:unknown*/ = undefined;
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
tmpAnonDefaultExport = tmpNestedAssignObjPatternRhs;
export { tmpAnonDefaultExport as default };
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = undefined;
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
tmpAnonDefaultExport = tmpNestedAssignObjPatternRhs;
export { tmpAnonDefaultExport as default };
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a: 1,
  b: 2,
};
const c = $( b );
const d = c.a;
a = c;
export { a as default };
$( d );
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
