# Preval test case

# a-bc-d-set.md

> Expr order > A-bc-d-set
>
> Double check whether this can't be broken

## Input

`````js filename=intro
let a = 1;
let b = {
    set c(x) { $('b.set'); b = null; d = null; return 7; },
};
let d = 3;
// This should _NOT_ crash. Despite all attempts to set b to null.
a = b.c = d;
// b should end up being null, d should end up being null, a should be 3.
$(a, b, d);
`````

## Settled


`````js filename=intro
let b /*:unknown*/ = {
  set c($$0) {
    debugger;
    $(`b.set`);
    b = null;
    d = null;
    return 7;
  },
};
let d /*:primitive*/ = 3;
b.c = 3;
$(3, b, d);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = {
  set c($$0) {
    $(`b.set`);
    b = null;
    d = null;
    return 7;
  },
};
let d = 3;
b.c = 3;
$(3, b, d);
`````

## Pre Normal


`````js filename=intro
let a = 1;
let b = {
  set c($$0) {
    let x = $$0;
    debugger;
    $(`b.set`);
    b = null;
    d = null;
    return 7;
  },
};
let d = 3;
a = b.c = d;
$(a, b, d);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = {
  set c($$0) {
    let x = $$0;
    debugger;
    $(`b.set`);
    b = null;
    d = null;
    return 7;
  },
};
let d = 3;
const tmpNestedPropAssignRhs = d;
b.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(tmpNestedPropAssignRhs, b, d);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = { set c( $$0 ) {
  debugger;
  $( "b.set" );
  a = null;
  b = null;
  return 7;
} };
let b = 3;
a.c = 3;
$( 3, a, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'b.set'
 - 2: 3, null, null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
