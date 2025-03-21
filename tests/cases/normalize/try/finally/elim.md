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


## Todos triggered


None


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
