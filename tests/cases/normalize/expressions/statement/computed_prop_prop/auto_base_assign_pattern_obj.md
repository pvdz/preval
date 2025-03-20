# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Computed prop prop > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
let obj = {};
obj[({ b } = $({ b: $(2) }))];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const obj /*:object*/ = {};
obj[tmpNestedAssignObjPatternRhs];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
({}[tmpNestedAssignObjPatternRhs]);
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
const e = {};
e[ c ];
const f = {
  a: 999,
  b: 1000,
};
$( f, d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
