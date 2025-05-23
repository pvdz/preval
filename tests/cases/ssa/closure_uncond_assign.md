# Preval test case

# closure_uncond_assign.md

> Ssa > Closure uncond assign
>
> Can SSA because all reads in g happen after an unconditional assign

## Input

`````js filename=intro
function f() {
  let x = undefined;
  let g = function() {
    x = function(){};
    $();
    $(x);
  }
  if ($) {
    g();
    return x;
  }
}
if ($) $(f());
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:()=>unknown*/ = function () {
    debugger;
    return undefined;
  };
  $();
  $(x);
  $(x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = function () {};
  $();
  $(x);
  $(x);
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
  $();
  $( a );
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: '<function>'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
