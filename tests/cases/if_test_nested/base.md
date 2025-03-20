# Preval test case

# base.md

> If test nested > Base
>
> When a const is tested twice, the second test is gonna have the same outcome as the first

## Input

`````js filename=intro
const x = $();
if (x) {
  $(1);
  if (x) {
    $('pass');
  } else {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $();
if (x) {
  $(1);
  $(`pass`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(1);
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  $( "pass" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
