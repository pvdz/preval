# Preval test case

# regression.md

> Conditional typing > Regression
>
> wat

## Input

`````js filename=intro
let curtype = 0;
function getType() {
  return curtype;
}
function skip() {
  curtype = $('random');
}
function f() {
  if (getType() !== 16472) {
    $('a');
  } else {
    skip(lexerFlags);
    if (getType() === 16473) {
      $('x');
    } else {
      $('y');
    }
  }
}

f();
f();
`````


## Settled


`````js filename=intro
let curtype /*:unknown*/ = 0;
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpBinLhs /*:unknown*/ = curtype;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === 16472;
  if (tmpIfTest) {
    lexerFlags;
    curtype = $(`random`);
    const tmpBinLhs$1 /*:unknown*/ = curtype;
    const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$1 === 16473;
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
    lexerFlags;
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
  const c = a;
  const d = c === 16472;
  if (d) {
    lexerFlags;
    a = $( "random" );
    const e = a;
    const f = e === 16473;
    if (f) {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpBinLhs = getType();
  const tmpIfTest = tmpBinLhs !== 16472;
  if (tmpIfTest) {
    $(`a`);
    return undefined;
  } else {
    skip(lexerFlags);
    const tmpBinLhs$1 = getType();
    const tmpIfTest$1 = tmpBinLhs$1 === 16473;
    if (tmpIfTest$1) {
      $(`x`);
      return undefined;
    } else {
      $(`y`);
      return undefined;
    }
  }
};
let getType = function () {
  debugger;
  return curtype;
};
let skip = function () {
  debugger;
  curtype = $(`random`);
  return undefined;
};
let curtype = 0;
f();
f();
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

lexerFlags


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
