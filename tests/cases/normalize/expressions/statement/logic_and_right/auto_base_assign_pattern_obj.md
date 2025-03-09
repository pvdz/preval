# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Logic and right > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(100) && ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(2);
  const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpClusterSSA_b /*:unknown*/ = tmpAssignObjPatternRhs.b;
  $(a, tmpClusterSSA_b);
} else {
  const b /*:object*/ = {};
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpObjLitVal = $(2);
  $(a, $({ b: tmpObjLitVal }).b);
} else {
  $(a, {});
}
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$(100) && ({ b: b } = $({ b: $(2) }));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
  $(a, b);
} else {
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
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
  const g = {};
  $( b, g );
}
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
