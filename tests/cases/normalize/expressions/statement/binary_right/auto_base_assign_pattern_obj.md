# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Binary right > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(100) + ({ b } = $({ b: $(2) }));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
tmpBinBothLhs + tmpNestedAssignObjPatternRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
tmpBinBothLhs + tmpNestedAssignObjPatternRhs;
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 2 );
const c = { b: b };
const d = $( c );
const e = d.b;
a + d;
const f = {
  a: 999,
  b: 1000,
};
$( f, e );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
