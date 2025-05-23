# Preval test case

# base.md

> Function splitting > Base
>
> A function that tests on a param and has two separate code paths based on that test might be splittable if we know all the args.

## Input

`````js filename=intro
function f(a) {
  if (a) {
    $('then');
  } else {
    $('else');
  }
}

f(0);
f('ok');
f(true);
f(false);
`````


## Settled


`````js filename=intro
$(`else`);
$(`then`);
$(`then`);
$(`else`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`else`);
$(`then`);
$(`then`);
$(`else`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "else" );
$( "then" );
$( "then" );
$( "else" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  if (a) {
    $(`then`);
    return undefined;
  } else {
    $(`else`);
    return undefined;
  }
};
f(0);
f(`ok`);
f(true);
f(false);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'else'
 - 2: 'then'
 - 3: 'then'
 - 4: 'else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
