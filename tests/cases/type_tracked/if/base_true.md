# Preval test case

# base_true.md

> Type tracked > If > Base true
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

## Input

`````js filename=intro
const x = true;
if (x) {
  $('false');
} else {
  $('pass');
}
`````


## Settled


`````js filename=intro
$(`false`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`false`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "false" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = true;
if (x) {
  $(`false`);
} else {
  $(`pass`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
