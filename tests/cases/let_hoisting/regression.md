# Preval test case

# regression.md

> Let hoisting > Regression
>
> This was a regression because when the decl was hoisted it would be init
> to undefined, but it should have been init to the same value as the first
> decl (1).

## Input

`````js filename=intro
if ($) {
  let x = 1;
  const f = function(a) {
    if (a) {
      x = a;
      $(x, a);
    } else {
      $('b', x, a);
    }
  };

  f(0);
  f(1);
}
$('!');
`````


## Settled


`````js filename=intro
if ($) {
  $(`b`, 1, 0);
  $(1, 1);
  $(`!`);
} else {
  $(`!`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(`b`, 1, 0);
  $(1, 1);
  $(`!`);
} else {
  $(`!`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( "b", 1, 0 );
  $( 1, 1 );
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
    if (a) {
      x = a;
      $(a, a);
      return undefined;
    } else {
      $(`b`, x, a);
      return undefined;
    }
  };
  f(0);
  f(1);
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
 - 1: 'b', 1, 0
 - 2: 1, 1
 - 3: '!'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
