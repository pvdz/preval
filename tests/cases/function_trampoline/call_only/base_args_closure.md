# Preval test case

# base_args_closure.md

> Function trampoline > Call only > Base args closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function() {
  const x = $(1);
  const g = function() {
    $(x);
  };
  g(); // In this test, this is the call we expect to be replaced by trampoline inlining...
};
f();
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
