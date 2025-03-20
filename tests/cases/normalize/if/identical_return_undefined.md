# Preval test case

# identical_return_undefined.md

> Normalize > If > Identical return undefined
>
> If both branches just return undefined then the if is redundant

This is an artifact that can happen during normalization

## Input

`````js filename=intro
function f() {
  if ($) {
    return undefined;
  } else {
    return undefined;
  }
}
function g() {
  if ($) return f();
}
if ($) $(g());
`````


## Settled


`````js filename=intro
if ($) {
  $(undefined);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
