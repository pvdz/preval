# Preval test case

# base_5.md

> Bit hacks > 2or3 > Base 5
>
> When comparing against two numbers that are one bit apart, we can merge them into an AND.

x === 2 || x === 3
->
(x & -2) === 2

Decided not to go forward with this one. There's no real advantage here and the result seems worse. Plus it triggers spies.

## Input

`````js filename=intro
const x = $(5);
if (x === 2 || x === 3) $('pass');
else $('fail');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(5);
const tmpIfTest /*:boolean*/ = x === 2;
if (tmpIfTest) {
  $(`pass`);
} else {
  const tmpClusterSSA_tmpIfTest /*:boolean*/ = x === 3;
  if (tmpClusterSSA_tmpIfTest) {
    $(`pass`);
  } else {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(5);
if (x === 2) {
  $(`pass`);
} else {
  if (x === 3) {
    $(`pass`);
  } else {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
const b = a === 2;
if (b) {
  $( "pass" );
}
else {
  const c = a === 3;
  if (c) {
    $( "pass" );
  }
  else {
    $( "fail" );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
