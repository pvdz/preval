# Preval test case

# param_to_closure.md

> Static arg ops > Assignment > Param to closure

## Input

`````js filename=intro
if ($) {
  let x = 1;
  const f = function(a) {
    x = a;
    $(x, a);
  };

  f(11);
  f(12);
  $(x);
}
$('!');
`````


## Settled


`````js filename=intro
if ($) {
  $(11, 11);
  $(12, 12);
  $(12);
  $(`!`);
} else {
  $(`!`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(11, 11);
  $(12, 12);
  $(12);
  $(`!`);
} else {
  $(`!`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 11, 11 );
  $( 12, 12 );
  $( 12 );
  $( "!" );
}
else {
  $( "!" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if ($) {
  let x = 1;
  const f = function ($$0) {
    let a = $$0;
    debugger;
    x = a;
    $(a, a);
    return undefined;
  };
  f(11);
  f(12);
  $(x);
  $(`!`);
} else {
  $(`!`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 11, 11
 - 2: 12, 12
 - 3: 12
 - 4: '!'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
