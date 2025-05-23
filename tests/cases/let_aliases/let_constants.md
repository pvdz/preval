# Preval test case

# let_constants.md

> Let aliases > Let constants
>
> Not sure but currently this is not minified further while it obviously could be

## Input

`````js filename=intro
let a = "fail";
if ($) {
  a = "pass";
  $( "pass" );
} else {
  const b = a;
  $( b );
  $( b );
}
`````


## Settled


`````js filename=intro
if ($) {
  $(`pass`);
} else {
  $(`fail`);
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(`pass`);
} else {
  $(`fail`);
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( "pass" );
}
else {
  $( "fail" );
  $( "fail" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = `fail`;
if ($) {
  a = `pass`;
  $(`pass`);
} else {
  const b = a;
  $(a);
  $(b);
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
