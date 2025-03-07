# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Logic and right > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(100) && ++$($(b)).x;
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(b);
  const tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam);
  const tmpCompoundAssignLhs /*:unknown*/ = tmpAssignMemLhsObj.x;
  const tmpAssignMemRhs /*:primitive*/ = tmpCompoundAssignLhs + 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const b = { x: 1 };
if (tmpIfTest) {
  const tmpAssignMemLhsObj = $($(b));
  tmpAssignMemLhsObj.x = tmpAssignMemLhsObj.x + 1;
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(100) && ++$($(b)).x;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpAssignMemLhsObj = $(tmpCalleeParam);
  const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpAssignMemRhs = tmpCompoundAssignLhs + 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
} else {
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
if (a) {
  const c = $( b );
  const d = $( c );
  const e = d.x;
  const f = e + 1;
  d.x = f;
}
const g = {
  a: 999,
  b: 1000,
};
$( g, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
