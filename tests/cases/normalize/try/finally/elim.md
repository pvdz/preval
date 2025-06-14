# Preval test case

# elim.md

> Normalize > Try > Finally > Elim
>
> Can we safely eliminate finally?

Narrator: no.

## Input

`````js filename=intro
function f() {
  try {
    $(1);
    fail;
    $('fail');
  } finally {
    $(3);
  }
  $('fail2');
}
$(f());
`````


## Settled


`````js filename=intro
try {
  $(1);
  fail;
  $(`fail`);
} catch ($finalImplicit) {
  $(3);
  throw $finalImplicit;
}
$(3);
$(`fail2`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
  fail;
  $(`fail`);
} catch ($finalImplicit) {
  $(3);
  throw $finalImplicit;
}
$(3);
$(`fail2`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
  fail;
  $( "fail" );
}
catch (a) {
  $( 3 );
  throw a;
}
$( 3 );
$( "fail2" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  try {
    $(1);
    fail;
    $(`fail`);
  } catch ($finalImplicit) {
    $(3);
    throw $finalImplicit;
  }
  $(3);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    $(`fail2`);
    return undefined;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


BAD@! Found 1 implicit global bindings:

fail


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
