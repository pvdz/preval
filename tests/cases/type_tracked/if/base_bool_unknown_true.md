# Preval test case

# base_bool_unknown_true.md

> Type tracked > If > Base bool unknown true
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

## Input

`````js filename=intro
const a = $(false);
const x = a === false;
if (x) {
  $(x, 'false');
} else {
  $(x, 'pass');
}
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(false);
const x /*:boolean*/ = a === false;
if (x) {
  $(true, `false`);
} else {
  $(false, `pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false) === false) {
  $(true, `false`);
} else {
  $(false, `pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
const b = a === false;
if (b) {
  $( true, "false" );
}
else {
  $( false, "pass" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true, 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
