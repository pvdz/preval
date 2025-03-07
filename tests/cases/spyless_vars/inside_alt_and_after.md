# Preval test case

# inside_alt_and_after.md

> Spyless vars > Inside alt and after
>
> A non-spying var decl in a single scope should be moved inside the thing that uses it, unless it is used in more places

## Input

`````js filename=intro
const a = +$('1');
const x = a * 2; // Preval will know `a` is a number of sorts. Not a spy.
if ($) {
  $('foo');
} else {
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
} else {
  $(x);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(`1`);
const x = +tmpUnaryArg * 2;
if ($) {
  $(`foo`);
} else {
  $(x);
}
$(x);
`````

## Pre Normal


`````js filename=intro
const a = +$(`1`);
const x = a * 2;
if ($) {
  $(`foo`);
} else {
  $(x);
}
$(x);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $(`1`);
const a = +tmpUnaryArg;
const x = a * 2;
if ($) {
  $(`foo`);
} else {
  $(x);
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "1" );
const b = +a;
const c = b * 2;
if ($) {
  $( "foo" );
}
else {
  $( c );
}
$( c );
`````

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
