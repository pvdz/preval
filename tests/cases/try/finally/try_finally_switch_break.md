# Preval test case

# try_finally_switch_break.md

> Try > Finally > Try finally switch break
>
> Finally transform checks

## Input

`````js filename=intro
switch ($) {
  case $:
    try {
      $(x, 1);
    } finally {
      $(2);
      break;
    }
  default:
    $('oops');
}
$(3);
`````


## Settled


`````js filename=intro
try {
  $(x, 1);
} catch ($finalImplicit) {}
$(2);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(x, 1);
} catch ($finalImplicit) {}
$(2);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( x, 1 );
}
catch (a) {

}
$( 2 );
$( 3 );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
