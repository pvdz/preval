# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Bindings > Export > Auto base assign pattern obj
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

export let a = ({ b } = $({ b: $(2) }));
$(a, b);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
export { a };
$(a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
export { a };
$(a, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 2 );
const c = { b: b };
const d = $( c );
const e = d.b;
a = d;
export { a as a };
$( a, e );
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
