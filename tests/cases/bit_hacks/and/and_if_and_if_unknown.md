# Preval test case

# and_if_and_if_unknown.md

> Bit hacks > And > And if and if unknown
>
> Combine two checked ands

## Input

`````js filename=intro
function f(a) {
  const x = a & 1;
  if (x) {
    const y = a & 4;
    if (y) {
      $('pass');
    }
  }
}

f($(1));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const x /*:number*/ = tmpCalleeParam & 1;
if (x) {
  const y /*:number*/ = tmpCalleeParam & 4;
  if (y) {
    $(`pass`);
  } else {
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
if (tmpCalleeParam & 1) {
  if (tmpCalleeParam & 4) {
    $(`pass`);
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 1;
  if (x) {
    const y = a & 4;
    if (y) {
      $(`pass`);
    }
  }
};
f($(1));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 1;
  if (x) {
    const y = a & 4;
    if (y) {
      $(`pass`);
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam = $(1);
tmpCallCallee(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a & 1;
if (b) {
  const c = a & 4;
  if (c) {
    $( "pass" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
