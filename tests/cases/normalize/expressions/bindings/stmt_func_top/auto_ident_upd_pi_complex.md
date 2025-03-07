# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident upd pi complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = ++$($(b)).x;
  $(a, b);
}
$(f());
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpCalleeParam);
const tmpBinLhs /*:unknown*/ = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs /*:primitive*/ = tmpBinLhs + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs, b);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const varInitAssignLhsComputedObj = $($(b));
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedObj.x + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs, b);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = ++$($(b)).x;
  $(a, b);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  const tmpCalleeParam = $(b);
  const varInitAssignLhsComputedObj = $(tmpCalleeParam);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
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
$( e, a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 2, { x: '2' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
