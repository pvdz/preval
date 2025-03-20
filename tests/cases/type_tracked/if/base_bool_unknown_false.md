# Preval test case

# base_bool_unknown_false.md

> Type tracked > If > Base bool unknown false
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

## Input

`````js filename=intro
const a = $(true);
const x = a === true;
if (x) {
  $(x, 'pass');
} else {
  $(x, 'false');
}
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(true);
const x /*:boolean*/ = a === true;
if (x) {
  $(true, `pass`);
} else {
  $(false, `false`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true) === true) {
  $(true, `pass`);
} else {
  $(false, `false`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = a === true;
if (b) {
  $( true, "pass" );
}
else {
  $( false, "false" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true, 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
