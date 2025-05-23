# Preval test case

# after_if.md

> Spyless vars > After if
>
> A non-spying var decl in a single scope should be moved inside the thing that uses it

## Input

`````js filename=intro
const a = +$('1');
const x = a * 2; // Preval will know `a` is a number of sorts. Not a spy.
if ($) {
  $('foo');
}
// <-- The var decl should be moved here
$(x);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(`1`);
const a /*:number*/ = +tmpUnaryArg;
const x /*:number*/ = a * 2;
if ($) {
  $(`foo`);
  $(x);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(`1`);
const x = +tmpUnaryArg * 2;
if ($) {
  $(`foo`);
  $(x);
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "1" );
const b = +a;
const c = b * 2;
if ($) {
  $( "foo" );
  $( c );
}
else {
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $(`1`);
const a = +tmpUnaryArg;
const x = a * 2;
if ($) {
  $(`foo`);
  $(x);
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1'
 - 2: 'foo'
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
