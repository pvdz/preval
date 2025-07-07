# Preval test case

# base.md

> Let scoping > Base
>
> Base case of moving a let decl inside the block that references it

## Input

`````js filename=intro
let move_me/*:unknown*/ = undefined;
if ($(true)) {
  $(false);
} else {

}
if ($(true)) {
  move_me = function($$0) {
  };
  const f/*:(unknown)=>undefined*/ = function($$0) {
    $(move_me)
  };
  $(f);
} else {

}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  const move_me /*:(unused)=>undefined*/ = function $pcompiled($$0) {
    debugger;
    return undefined;
  };
  const f /*:(unused)=>undefined*/ = function ($$0) {
    debugger;
    $(move_me);
    return undefined;
  };
  $(f);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
}
if ($(true)) {
  const move_me = function $pcompiled($$0) {};
  $(function ($$0) {
    $(move_me);
  });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
}
const b = $( true );
if (b) {
  const c = function $pcompiled($$0 ) {
    debugger;
    return undefined;
  };
  const d = function($$0 ) {
    debugger;
    $( c );
    return undefined;
  };
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let move_me = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  move_me = function ($$0) {
    let $dlr_$$0 = $$0;
    debugger;
    return undefined;
  };
  const f = function ($$0) {
    let $dlr_$$1 = $$0;
    debugger;
    $(move_me);
    return undefined;
  };
  $(f);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: true
 - 4: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
