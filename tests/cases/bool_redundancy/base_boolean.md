# Preval test case

# base_boolean.md

> Bool redundancy > Base boolean
>
> Bool coercions that are only used in bool contexts can be dropped because they cannot be observed

## Input

`````js filename=intro
const x = Boolean($);
$(!x);
if ($(0)) {
  $('fail');
} else {
  $(Boolean(x));
}
`````

## Settled


`````js filename=intro
const x /*:boolean*/ = Boolean($);
const tmpCalleeParam /*:boolean*/ = !x;
$(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(`fail`);
} else {
  $(x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = Boolean($);
$(!x);
if ($(0)) {
  $(`fail`);
} else {
  $(x);
}
`````

## Pre Normal


`````js filename=intro
const x = Boolean($);
$(!x);
if ($(0)) {
  $(`fail`);
} else {
  $(Boolean(x));
}
`````

## Normalized


`````js filename=intro
const x = Boolean($);
const tmpCalleeParam = !x;
$(tmpCalleeParam);
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(`fail`);
} else {
  const tmpCalleeParam$1 = Boolean(x);
  $(tmpCalleeParam$1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = Boolean( $ );
const b = !a;
$( b );
const c = $( 0 );
if (c) {
  $( "fail" );
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - 2: 0
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
