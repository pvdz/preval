# Preval test case

# concat_arrays_assign_nums.md

> Builtins cases > Array > Concat arrays assign nums
>
> const a = [];

## Input

`````js filename=intro
const a = [1];
const b = [2];
let c;
if ($) {
  c = a.concat(b);
}
$(c);
`````

## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_c /*:array*/ = [1, 2];
  $(tmpClusterSSA_c);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $([1, 2]);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
const a = [1];
const b = [2];
let c;
if ($) {
  c = a.concat(b);
}
$(c);
`````

## Normalized


`````js filename=intro
const a = [1];
const b = [2];
let c = undefined;
if ($) {
  c = a.concat(b);
  $(c);
} else {
  $(c);
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = [ 1, 2 ];
  $( a );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_concat
