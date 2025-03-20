# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Stmt func top > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = {};

  let a = { a: 999, b: 1000 };
  ({ b } = $({ b: $(2) }));
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpAssignObjPatternRhs.b;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpClusterSSA_b = $({ b: tmpObjLitVal }).b;
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
const e = {
  a: 999,
  b: 1000,
};
$( e, d );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { a: '999', b: '1000' }, 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
