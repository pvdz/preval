# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Arr element > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$((a = { b } = $({ b: $(2) })) + (a = { b } = $({ b: $(2) })));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
tmpNestedAssignObjPatternRhs.b;
const tmpObjLitVal$1 /*:unknown*/ = $(2);
const tmpCalleeParam$3 /*:object*/ /*truthy*/ = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs$1.b;
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs$1, tmpSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
tmpNestedAssignObjPatternRhs.b;
const tmpObjLitVal$1 = $(2);
const tmpNestedAssignObjPatternRhs$1 = $({ b: tmpObjLitVal$1 });
const tmpSSA_b = tmpNestedAssignObjPatternRhs$1.b;
$(tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1);
$(tmpNestedAssignObjPatternRhs$1, tmpSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
c.b;
const d = $( 2 );
const e = { b: d };
const f = $( e );
const g = f.b;
const h = c + f;
$( h );
$( f, g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
let tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
const tmpBinBothLhs = a;
const tmpObjLitVal$1 = $(2);
let tmpCalleeParam$3 = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$3);
b = tmpNestedAssignObjPatternRhs$1.b;
a = tmpNestedAssignObjPatternRhs$1;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 2
 - 4: { b: '2' }
 - 5: '[object Object][object Object]'
 - 6: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
