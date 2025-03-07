# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = { a: 999, b: 1000 };
    a = $($(b)).x++;
    $(a, b);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpPostUpdArgObj /*:unknown*/ = $(tmpCalleeParam);
const tmpPostUpdArgVal /*:unknown*/ = tmpPostUpdArgObj.x;
const tmpAssignMemRhs /*:primitive*/ = tmpPostUpdArgVal + 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
$(tmpPostUpdArgVal, b);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpPostUpdArgObj = $($(b));
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
tmpPostUpdArgObj.x = tmpPostUpdArgVal + 1;
$(tmpPostUpdArgVal, b);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { x: 1 };
    let a = { a: 999, b: 1000 };
    a = $($(b)).x++;
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
  const tmpPostUpdArgObj = $(tmpCalleeParam);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
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
const e = d + 1;
c.x = e;
$( d, a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1, { x: '2' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
