# Preval test case

# regression2.md

> Conditional typing > Regression2
>
> wat

## Input

`````js filename=intro
let curtype = 0;
const f = function () {
  debugger;
  const tmpIfTest = curtype === 16472;
  if (tmpIfTest) {
    curtype = $('random');
    undefined;
    const tmpIfTest$1 = curtype === 16473;
    if (tmpIfTest$1) {
      $('x');
      return undefined;
    } else {
      $('y');
      return undefined;
    }
  } else {
    $('a');
    return undefined;
  }
};
f();
f();
`````


## Settled


`````js filename=intro
let curtype /*:unknown*/ = 0;
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:boolean*/ = curtype === 16472;
  if (tmpIfTest) {
    curtype = $(`random`);
    const tmpIfTest$1 /*:boolean*/ = curtype === 16473;
    if (tmpIfTest$1) {
      $(`x`);
      return undefined;
    } else {
      $(`y`);
      return undefined;
    }
  } else {
    $(`a`);
    return undefined;
  }
};
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let curtype = 0;
const f = function () {
  if (curtype === 16472) {
    curtype = $(`random`);
    if (curtype === 16473) {
      $(`x`);
    } else {
      $(`y`);
    }
  } else {
    $(`a`);
  }
};
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = function() {
  debugger;
  const c = a === 16472;
  if (c) {
    a = $( "random" );
    const d = a === 16473;
    if (d) {
      $( "x" );
      return undefined;
    }
    else {
      $( "y" );
      return undefined;
    }
  }
  else {
    $( "a" );
    return undefined;
  }
};
b();
b();
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
