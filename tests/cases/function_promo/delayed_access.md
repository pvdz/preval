# Preval test case

# delayed_access.md

> Function promo > Delayed access
>
> Trying to sketch the problem of access to a binding that was declared much later

## Input

`````js filename=intro
function f() {
  function g() {
    if ($) $(x);
  }
  
  const x = $('x');
  if ($) g();
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(`x`);
  if ($) {
    $(x);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(`x`);
  if ($) {
    $(x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( "x" );
  if ($) {
    $( a );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if ($) {
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  const x = $(`x`);
  if ($) {
    g();
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
