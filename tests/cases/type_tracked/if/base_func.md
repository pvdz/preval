# Preval test case

# base_func.md

> Type tracked > If > Base func
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

## Input

`````js filename=intro
const x = function() { $('fail'); };
if (x) {
  $('pass');
} else {
  $('false');
}
`````


## Settled


`````js filename=intro
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = function () {
  debugger;
  $(`fail`);
  return undefined;
};
if (x) {
  $(`pass`);
} else {
  $(`false`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
