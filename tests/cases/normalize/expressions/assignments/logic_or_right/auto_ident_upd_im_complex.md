# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) || (a = $($(b)).x--));
$(a, b);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(b);
  const tmpPostUpdArgObj /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpPostUpdArgVal /*:unknown*/ = tmpPostUpdArgObj.x;
  const tmpAssignMemRhs /*:number*/ = tmpPostUpdArgVal - 1;
  tmpPostUpdArgObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
  $(tmpPostUpdArgVal);
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
const b = { x: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpPostUpdArgObj = $($(b));
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  tmpPostUpdArgObj.x = tmpPostUpdArgVal - 1;
  a = tmpPostUpdArgVal;
  $(tmpPostUpdArgVal);
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(100) || (a = $($(b)).x--));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj = $(tmpCalleeParam$1);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  const tmpNestedComplexRhs = tmpPostUpdArgVal;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 100 );
const c = { x: 1 };
if (b) {
  $( b );
}
else {
  const d = $( c );
  const e = $( d );
  const f = e.x;
  const g = f - 1;
  e.x = g;
  a = f;
  $( f );
}
$( a, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
