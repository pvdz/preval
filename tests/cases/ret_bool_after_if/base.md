# Preval test case

# base.md

> Ret bool after if > Base
>
> Same

-> `let x = f(); if (x) { let y = g(); return Boolean(y); } else { return false }`

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if (x) {
    x = g();
    $('a'); 
  } else {
    $('b');
  }
  return Boolean(x);
}

$(f());
$(f());
`````

## Settled


`````js filename=intro
const f /*:()=>boolean*/ = function () {
  debugger;
  let x /*:unknown*/ = $(1);
  if (x) {
    x = g();
    $(`a`);
  } else {
    $(`b`);
  }
  const tmpReturnArg /*:boolean*/ = Boolean(x);
  return tmpReturnArg;
};
const tmpCalleeParam /*:boolean*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = f();
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  let x = $(1);
  if (x) {
    x = g();
    $(`a`);
  } else {
    $(`b`);
  }
  const tmpReturnArg = Boolean(x);
  return tmpReturnArg;
};
$(f());
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if (x) {
    x = g();
    $(`a`);
  } else {
    $(`b`);
  }
  return Boolean(x);
};
$(f());
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if (x) {
    x = g();
    $(`a`);
  } else {
    $(`b`);
  }
  const tmpReturnArg = Boolean(x);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = $( 1 );
  if (b) {
    b = g();
    $( "a" );
  }
  else {
    $( "b" );
  }
  const c = Boolean( b );
  return c;
};
const d = a();
$( d );
const e = a();
$( e );
`````

## Globals

BAD@! Found 1 implicit global bindings:

g

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
