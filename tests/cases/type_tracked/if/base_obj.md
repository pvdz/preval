# Preval test case

# base_obj.md

> Type tracked > If > Base obj
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

## Input

`````js filename=intro
const x = {a: 1, b: 2};
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
const x = { a: 1, b: 2 };
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
