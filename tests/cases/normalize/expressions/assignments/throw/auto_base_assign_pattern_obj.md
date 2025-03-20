# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Throw > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
throw (a = { b } = $({ b: $(2) }));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
tmpNestedAssignObjPatternRhs.b;
throw tmpNestedAssignObjPatternRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
tmpNestedAssignObjPatternRhs.b;
throw tmpNestedAssignObjPatternRhs;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
c.b;
throw c;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
