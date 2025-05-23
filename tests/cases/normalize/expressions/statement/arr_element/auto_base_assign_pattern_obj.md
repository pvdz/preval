# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Arr element > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
({ b } = $({ b: $(2) })) + ({ b } = $({ b: $(2) }));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
tmpNestedAssignObjPatternRhs.b;
const tmpObjLitVal$1 /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
const b /*:unknown*/ = tmpNestedAssignObjPatternRhs$1.b;
tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
tmpNestedAssignObjPatternRhs.b;
const tmpObjLitVal$1 = $(2);
const tmpNestedAssignObjPatternRhs$1 = $({ b: tmpObjLitVal$1 });
const b = tmpNestedAssignObjPatternRhs$1.b;
tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
$({ a: 999, b: 1000 }, b);
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
c + f;
const h = {
  a: 999,
  b: 1000,
};
$( h, g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpObjLitVal = $(2);
let tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpBinBothLhs = tmpNestedAssignObjPatternRhs;
let tmpBinBothRhs = undefined;
const tmpObjLitVal$1 = $(2);
let tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs$1.b;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
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
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
