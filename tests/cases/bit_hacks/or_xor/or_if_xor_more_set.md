# Preval test case

# or_if_xor_more_set.md

> Bit hacks > Or xor > Or if xor more set
>
> Checking whether a bit is set and then xorring it if that's the case is the same as anding with ~-1 without that one bit set at once

## Input

`````js filename=intro
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $('then');
} else {
  $('else');
}
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(35);
const y /*:number*/ = x | 32;
if (y) {
  const tmpClusterSSA_x /*:number*/ = x ^ 32;
  $(`then`);
  $(tmpClusterSSA_x);
} else {
  $(`else`);
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(35);
if (x | 32) {
  const tmpClusterSSA_x = x ^ 32;
  $(`then`);
  $(tmpClusterSSA_x);
} else {
  $(`else`);
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 35 );
const b = a | 32;
if (b) {
  const c = a ^ 32;
  $( "then" );
  $( c );
}
else {
  $( "else" );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $(`then`);
  $(x);
} else {
  $(`else`);
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 35
 - 2: 'then'
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
