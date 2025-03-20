# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(({ a } = $({ a: 1, b: 2 })) + ({ a } = $({ a: 1, b: 2 })));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
tmpNestedAssignObjPatternRhs.a;
const tmpCalleeParam$3 /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs$1.a;
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
tmpNestedAssignObjPatternRhs.a;
const tmpNestedAssignObjPatternRhs$1 = $({ a: 1, b: 2 });
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs$1.a;
$(tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1);
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
b.a;
const c = {
  a: 1,
  b: 2,
};
const d = $( c );
const e = d.a;
const f = b + d;
$( f );
$( e );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: '[object Object][object Object]'
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
