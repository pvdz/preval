# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Switch default > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    ++$($(b)).x;
}
$(a, b);
`````

## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam);
const tmpCompoundAssignLhs /*:unknown*/ = tmpAssignMemLhsObj.x;
const tmpAssignMemRhs /*:primitive*/ = tmpCompoundAssignLhs + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const b = { x: 1 };
const tmpAssignMemLhsObj = $($(b));
tmpAssignMemLhsObj.x = tmpAssignMemLhsObj.x + 1;
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    ++$($(b)).x;
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpCalleeParam = $(b);
const tmpAssignMemLhsObj = $(tmpCalleeParam);
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 1;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d + 1;
c.x = e;
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
