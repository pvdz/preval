# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Stmt global top > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
a = { b } = $({ b: $(2) });
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
$(tmpNestedAssignObjPatternRhs, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
$(tmpNestedAssignObjPatternRhs, tmpNestedAssignObjPatternRhs.b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
$( c, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
let tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
$(tmpNestedAssignObjPatternRhs, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
