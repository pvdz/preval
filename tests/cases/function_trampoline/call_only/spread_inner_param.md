# Preval test case

# spread_inner_param.md

> Function trampoline > Call only > Spread inner param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const y = $('pass');
const f = function(x) {
  $(...x);
};
f(y); // In this test, this is the call we expect to be replaced by trampoline inlining...
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const y = $(`pass`);
const f = function ($$0) {
  let x = $$0;
  debugger;
  $(...x);
  return undefined;
};
f(y);
`````


## Todos triggered


None


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
