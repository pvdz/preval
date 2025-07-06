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
  const x /*:()=>unknown*/ = function $pcompiled() {
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
  $(function $pcompiled() {});
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = function $pcompiled() {
    debugger;
    return undefined;
  };
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = undefined;
    x = function () {
      debugger;
      return undefined;
    };
    $(x);
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
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
