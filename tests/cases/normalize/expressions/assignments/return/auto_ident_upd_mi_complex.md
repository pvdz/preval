# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = --$($(b)).x);
}
$(f());
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpNestedAssignObj /*:unknown*/ = $(tmpCalleeParam);
const tmpBinLhs /*:unknown*/ = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs /*:number*/ = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
$(tmpNestedPropCompoundComplexRhs);
$(tmpNestedPropCompoundComplexRhs, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignObj = $($(b));
const tmpNestedPropCompoundComplexRhs = tmpNestedAssignObj.x - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
$(tmpNestedPropCompoundComplexRhs);
$(tmpNestedPropCompoundComplexRhs, b);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = --$($(b)).x);
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  return a;
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
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
$( e );
$( e, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 0
 - 4: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
