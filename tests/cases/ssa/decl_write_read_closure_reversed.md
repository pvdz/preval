# Preval test case

# decl_write_read_closure_reversed.md

> Ssa > Decl write read closure reversed
>
> Trying to punch a hole into the existing algo because I think it's broken

## Input

`````js filename=intro
function f() {
  if ($) { // Prevent normalization from inlining the func immediately
    let x = 5;
    const g = function(){
      if ($) x = 10;
    };
    g();
    if ($) x = 20;
    return x;
  }
}
if ($) $(f());
`````


## Settled


`````js filename=intro
if ($) {
  $(20);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(20);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 20 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
