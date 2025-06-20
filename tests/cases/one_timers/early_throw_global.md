# Preval test case

# early_throw_global.md

> One timers > Early throw global
>
> A single call func would not be inlined in global if it had an early return. But early throw should be fine.

## Input

`````js filename=intro
// Inline me into global
function f() {
  if ($) {
    $(1);
  } else {
    throw '$ should be defined';
  }
  return $('ok');
}

$(f());
`````


## Settled


`````js filename=intro
if ($) {
  $(1);
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(`ok`);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  throw `\$ should be defined`;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
  $($(`ok`));
} else {
  throw `\$ should be defined`;
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  const a = $( "ok" );
  $( a );
}
else {
  throw "$ should be defined";
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(1);
    const tmpReturnArg = $(`ok`);
    return tmpReturnArg;
  } else {
    throw `\$ should be defined`;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'ok'
 - 3: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
