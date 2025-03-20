# Preval test case

# no__hoisting_use_before_define.md

> Binding > Promote const > No  hoisting use before define
>
> Trying to create classic tdz problems

The var is used in different scopes so not easy to change it to a constant.

## Input

`````js filename=intro
var x = 100;
g();
if ($(1)) {
  x = 10;
}
$(x);
function g() {
  x = 20;
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(10);
} else {
  $(20);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(10);
} else {
  $(20);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 10 );
}
else {
  $( 20 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
