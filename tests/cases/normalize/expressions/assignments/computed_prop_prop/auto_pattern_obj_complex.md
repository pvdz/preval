# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let obj = {};
obj[({ a } = $({ a: 1, b: 2 }))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
$coerce(tmpNestedAssignObjPatternRhs, `string`);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
$coerce(tmpNestedAssignObjPatternRhs, `string`);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
$coerce( b, "string" );
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
