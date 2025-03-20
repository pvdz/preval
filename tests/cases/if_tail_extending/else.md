# Preval test case

# else.md

> If tail extending > Else
>
> The else should also work

## Input

`````js filename=intro
function f() {
  if ($) {}
  else { return }
  $('x')
}
f();
`````


## Settled


`````js filename=intro
if ($) {
  $(`x`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(`x`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( "x" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
