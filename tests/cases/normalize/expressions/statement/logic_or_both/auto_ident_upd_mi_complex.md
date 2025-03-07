# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
--$($(b)).x || --$($(b)).x;
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpCalleeParam);
const tmpBinLhs /*:unknown*/ = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs /*:number*/ = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(b);
  const tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpCompoundAssignLhs /*:unknown*/ = tmpAssignMemLhsObj.x;
  const tmpAssignMemRhs /*:number*/ = tmpCompoundAssignLhs - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const varInitAssignLhsComputedObj = $($(b));
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedObj.x - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
if (!varInitAssignLhsComputedRhs) {
  const tmpAssignMemLhsObj = $($(b));
  tmpAssignMemLhsObj.x = tmpAssignMemLhsObj.x - 1;
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
--$($(b)).x || --$($(b)).x;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(b);
const varInitAssignLhsComputedObj = $(tmpCalleeParam);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpIfTest = varInitAssignLhsComputedRhs;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(b);
  const tmpAssignMemLhsObj = $(tmpCalleeParam$1);
  const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d - 1;
c.x = e;
if (e) {

}
else {
  const f = $( a );
  const g = $( f );
  const h = g.x;
  const i = h - 1;
  g.x = i;
}
const j = {
  a: 999,
  b: 1000,
};
$( j, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '0' }
 - 4: { x: '0' }
 - 5: { a: '999', b: '1000' }, { x: '-1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
