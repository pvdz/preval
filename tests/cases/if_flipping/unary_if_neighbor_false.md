# Preval test case

# unary_if_neighbor_false.md

> If flipping > Unary if neighbor false
>
> When the binding is used in multiple `if`s

## Input

`````js filename=intro
const a = $(false);
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
const a /*:unknown*/ = $(false);
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
const a = $(false);
const b = $(`alt`);
if (a) {
  $(false);
} else {
  $(b);
}
`````

## Pre Normal


`````js filename=intro
const a = $(false);
const b = $(`alt`);
let test = !a;
if (test) {
  test = b;
} else {
}
$(test);
`````

## Normalized


`````js filename=intro
const a = $(false);
const b = $(`alt`);
let test = !a;
if (test) {
  test = b;
  $(b);
} else {
  $(test);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
const b = $( "alt" );
if (a) {
  $( false );
}
else {
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - 2: 'alt'
 - 3: 'alt'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
