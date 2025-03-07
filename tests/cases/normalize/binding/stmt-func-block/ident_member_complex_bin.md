# Preval test case

# ident_member_complex_bin.md

> Normalize > Binding > Stmt-func-block > Ident member complex bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= $(b).x = c + d;
  $(a, b, c);
}
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const b /*:object*/ = { x: 2 };
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  varInitAssignLhsComputedObj.x = 7;
  $(7, b, 3);
} else {
}
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const b = { x: 2 };
  const varInitAssignLhsComputedObj = $(b);
  varInitAssignLhsComputedObj.x = 7;
  $(7, b, 3);
}
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let b = { x: 2 },
      c = 3,
      d = 4;
    let a = ($(b).x = c + d);
    $(a, b, c);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = { x: 2 };
    let c = 3;
    let d = 4;
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedRhs = c + d;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    let a = varInitAssignLhsComputedRhs;
    $(a, b, c);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = { x: 2 };
  const c = $( b );
  c.x = 7;
  $( 7, b, 3 );
}
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: { x: '2' }
 - 3: 7, { x: '7' }, 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
