# Preval test case

# alias_closure.md

> If test aliased > Alias closure
>
> let alias is captured by a closure, should NOT replace $(a)

## Input

`````js filename=intro
const c = $(true);
let a = !c;
function f() {
  if (c) {
    $(a); // expect: $(a)
  }
}
$(f());
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  $(false);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
  $(undefined);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
  $( undefined );
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if (c) {
    $(a);
    return undefined;
  } else {
    return undefined;
  }
};
const c = $(true);
let a = !c;
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
