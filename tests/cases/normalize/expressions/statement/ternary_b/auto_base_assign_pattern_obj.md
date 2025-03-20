# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Ternary b > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(1) ? ({ b } = $({ b: $(2) })) : $(200);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(2);
  const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpClusterSSA_b /*:unknown*/ = tmpAssignObjPatternRhs.b;
  $(a, tmpClusterSSA_b);
} else {
  $(200);
  const b /*:object*/ = {};
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpObjLitVal = $(2);
  $(a, $({ b: tmpObjLitVal }).b);
} else {
  $(200);
  $(a, {});
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 2 );
  const d = { b: c };
  const e = $( d );
  const f = e.b;
  $( b, f );
}
else {
  $( 200 );
  const g = {};
  $( b, g );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
