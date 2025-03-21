# Preval test case

# unary_if_neighbor_true.md

> If flipping > Unary if neighbor true
>
> When the binding is used in multiple `if`s

## Input

`````js filename=intro
const a = $(true);
const b = $('alt');
let test = !a;
if (test) {
  test = b;
} else {
}
$(test);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(true);
const b /*:unknown*/ = $(`alt`);
if (a) {
  $(false);
} else {
  $(b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(true);
const b = $(`alt`);
if (a) {
  $(false);
} else {
  $(b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $( "alt" );
if (a) {
  $( false );
}
else {
  $( b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'alt'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
