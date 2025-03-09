# Preval test case

# call_yes_no_yes2.md

> Normalize > Optional > Call yes no yes2
>
> Mix optional with regular member call

## Input

`````js filename=intro
const a /*:()=>object*/ = function () {
  debugger;
  const a$1 /*:object*/ = {
    a() {
      debugger;
      return a$1;
    },
  };
  return a$1;
};
const tmpIfTest /*:boolean*/ = a == null;
if (tmpIfTest) {
  $('fail');
} else {
  $('pass');
}
`````

## Settled


`````js filename=intro
$(`pass`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
`````

## Pre Normal


`````js filename=intro
const a = function () {
  debugger;
  const a$1 = {
    a() {
      debugger;
      return a$1;
    },
  };
  return a$1;
};
const tmpIfTest = a == null;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized


`````js filename=intro
const a = function () {
  debugger;
  const a$1 = {
    a() {
      debugger;
      return a$1;
    },
  };
  return a$1;
};
const tmpIfTest = a == null;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
