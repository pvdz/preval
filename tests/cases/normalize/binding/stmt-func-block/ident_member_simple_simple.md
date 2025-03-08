# Preval test case

# ident_member_simple_simple.md

> Normalize > Binding > Stmt-func-block > Ident member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3;
  let a= b.x = c;
  $(a, b, c);
}
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const b /*:object*/ = { x: 3 };
  $(3, b, 3);
} else {
}
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(3, { x: 3 }, 3);
}
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let b = { x: 2 },
      c = 3;
    let a = (b.x = c);
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
    const varInitAssignLhsComputedRhs = c;
    b.x = varInitAssignLhsComputedRhs;
    let a = varInitAssignLhsComputedRhs;
    $(varInitAssignLhsComputedRhs, b, c);
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
  const b = { x: 3 };
  $( 3, b, 3 );
}
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 3, { x: '3' }, 3
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
