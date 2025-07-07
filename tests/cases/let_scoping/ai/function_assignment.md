# Preval test case

# function_assignment.md

> Let scoping > Ai > Function assignment
>
> Test let scoping: let assigned a function and used in block

## Input

`````js filename=intro
let x = undefined;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = function() { return $(1); };
  $(() => x);
  $(x);
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
  let x /*:unknown*/ = undefined;
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = function () {
      debugger;
      const tmpReturnArg /*:unknown*/ = $(1);
      return tmpReturnArg;
    };
  } else {
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
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
  let x = undefined;
  if ($(true)) {
    x = function () {
      const tmpReturnArg = $(1);
      return tmpReturnArg;
    };
  }
  $(function () {
    return x;
  });
  $(x);
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
  let c = undefined;
  const d = $( true );
  if (d) {
    c = function() {
      debugger;
      const e = $( 1 );
      return e;
    };
  }
  const f = function() {
    debugger;
    return c;
  };
  $( f );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = function () {
      debugger;
      const tmpReturnArg = $(1);
      return tmpReturnArg;
    };
  } else {
  }
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
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
 - 4: true
 - 5: '<function>'
 - 6: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
