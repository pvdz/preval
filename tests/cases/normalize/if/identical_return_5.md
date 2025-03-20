# Preval test case

# identical_return_5.md

> Normalize > If > Identical return 5
>
> If both branches just return undefined then the if is redundant

This is an artifact that can happen during normalization

## Input

`````js filename=intro
const foo = $();
function f() {
  if ($) {
    return 5;
  } else {
    return 5;
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
  $(5);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
if ($) {
  $(5);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$();
if ($) {
  $( 5 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
