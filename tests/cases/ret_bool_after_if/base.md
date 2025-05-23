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
  const tmpReturnArg /*:boolean*/ = $boolean_constructor(x);
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
  const tmpReturnArg = $boolean_constructor(x);
  return tmpReturnArg;
};
$(f());
$(f());
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
  const c = $boolean_constructor( b );
  return c;
};
const d = a();
$( d );
const e = a();
$( e );
`````


## Normalized
(This is what phase1 received the first time)

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
  const tmpReturnArg = $boolean_constructor(x);
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
