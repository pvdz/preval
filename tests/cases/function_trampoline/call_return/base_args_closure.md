# Preval test case

# base_args_closure.md

> Function trampoline > Call return > Base args closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function() {
  const x = $(1);
  const g = function() {
    const r = $(x);
    return r;
  };
  const q = g(); // In this test, this is the call we expect to be replaced by trampoline inlining...
  $(q);
};
f();
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const q /*:unknown*/ = $(x);
$(q);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($(1)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  const x = $(1);
  const g = function () {
    debugger;
    const r = $(x);
    return r;
  };
  const q = g();
  $(q);
  return undefined;
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
