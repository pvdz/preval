# Preval test case

# obj_computed_bool.md

> If test merging > Obj computed bool
>
> When if test is an unknown boolean and the first statement is equal 
> except for boolean values then it can replace them with the test var.

## Input

`````js filename=intro
const bool = Boolean($(true));
const a = $();
let x;
if (bool) {
  x = {[true]: 1, b: true};
} else {
  x = {[false]: 1, b: false};
}
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(true);
$();
if (tmpCalleeParam) {
  const tmpClusterSSA_x /*:object*/ = { [true]: 1, b: true };
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:object*/ = { [false]: 1, b: false };
  $(tmpClusterSSA_x$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(true);
$();
if (tmpCalleeParam) {
  $({ [true]: 1, b: true });
} else {
  $({ [false]: 1, b: false });
}
`````

## Pre Normal


`````js filename=intro
const bool = Boolean($(true));
const a = $();
let x;
if (bool) {
  x = { [true]: 1, b: true };
} else {
  x = { [false]: 1, b: false };
}
$(x);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $(true);
const bool = Boolean(tmpCalleeParam);
const a = $();
let x = undefined;
if (bool) {
  x = { [true]: 1, b: true };
  $(x);
} else {
  x = { [false]: 1, b: false };
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
$();
if (a) {
  const b = {
    [ true ]: 1,
    b: true,
  };
  $( b );
}
else {
  const c = {
    [ false ]: 1,
    b: false,
  };
  $( c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 
 - 3: { true: '1', b: 'true' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
