# Preval test case

# identical_return_minus_infinity.md

> Normalize > If > Identical return minus infinity
>
> If both branches just return undefined then the if is redundant

This is an artifact that can happen during normalization

## Input

`````js filename=intro
const foo = $();
function f() {
  if ($) {
    return -Infinity;
  } else {
    return -Infinity;
  }
}
function g() {
  if ($) return f();
}
if ($) $(g());
`````


## Settled


`````js filename=intro
$();
if ($) {
  $(-Infinity);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
if ($) {
  $(-Infinity);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$();
if ($) {
  $( -Infinity );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
