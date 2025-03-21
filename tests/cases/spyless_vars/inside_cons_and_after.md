# Preval test case

# inside_cons_and_after.md

> Spyless vars > Inside cons and after
>
> A non-spying var decl in a single scope should be moved inside the thing that uses it, unless it is used in more places

## Input

`````js filename=intro
const a = +$('1');
const x = a * 2; // Preval will know `a` is a number of sorts. Not a spy.
if ($) {
  $('foo');
  $(x);
}
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
  $( c );
}
else {
  $( c );
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
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
