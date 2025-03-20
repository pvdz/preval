# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Objlit spread > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$({ ...({ a } = $({ a: 1, b: 2 })) });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
const tmpCalleeParam /*:object*/ = { ...tmpNestedAssignObjPatternRhs };
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
$({ ...tmpNestedAssignObjPatternRhs });
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
const d = { ... b };
$( d );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
