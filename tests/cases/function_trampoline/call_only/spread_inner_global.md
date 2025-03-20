# Preval test case

# spread_inner_global.md

> Function trampoline > Call only > Spread inner global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const x = $('pass');
const f = function() {
  $(...x);
};
f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`pass`);
$(...x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`pass`);
$(...x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
$( ...a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'p', 'a', 's', 's'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
