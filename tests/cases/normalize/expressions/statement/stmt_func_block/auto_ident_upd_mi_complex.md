# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = { a: 999, b: 1000 };
    --$($(b)).x;
    $(a, b);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam);
const tmpCompoundAssignLhs /*:unknown*/ = tmpAssignMemLhsObj.x;
const tmpAssignMemRhs /*:number*/ = tmpCompoundAssignLhs - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpAssignMemLhsObj = $($(b));
tmpAssignMemLhsObj.x = tmpAssignMemLhsObj.x - 1;
$({ a: 999, b: 1000 }, b);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { x: 1 };
    let a = { a: 999, b: 1000 };
    --$($(b)).x;
    $(a, b);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(b);
  const tmpAssignMemLhsObj = $(tmpCalleeParam);
  const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  $(a, b);
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
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
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }, { x: '0' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
