# Preval test case

# back2back_ok.md

> Ssa > Back2back ok
>
> Assignment of a func

## Input

`````js filename=intro
function f() {
  if ($) {
    let x = undefined;
    x = function(){};
    $(x);
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:()=>unknown*/ = function () {
    debugger;
    return undefined;
  };
  $(x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(function () {});
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = function() {
    debugger;
    return undefined;
  };
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
