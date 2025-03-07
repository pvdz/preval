# Preval test case

# base2.md

> If test nested > Base2
>
> When a const is tested twice, the second test is gonna have the same outcome as the first

## Input

`````js filename=intro
const x = $();
if (x) {
  $(1);
  if ($(2)) $(3);
  if (!x) {
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
  const tmpIfTest /*:unknown*/ = $(2);
  if (tmpIfTest) {
    $(3);
  } else {
  }
  $(`fail`);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(1);
  if ($(2)) {
    $(3);
  }
  $(`fail`);
}
`````

## Pre Normal


`````js filename=intro
const x = $();
if (x) {
  $(1);
  if ($(2)) $(3);
  if (!x) {
    $(`pass`);
  } else {
    $(`fail`);
  }
}
`````

## Normalized


`````js filename=intro
const x = $();
if (x) {
  $(1);
  const tmpIfTest = $(2);
  if (tmpIfTest) {
    $(3);
  } else {
  }
  if (x) {
    $(`fail`);
  } else {
    $(`pass`);
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  const b = $( 2 );
  if (b) {
    $( 3 );
  }
  $( "fail" );
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
