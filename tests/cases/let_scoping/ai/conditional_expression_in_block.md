# Preval test case

# conditional_expression_in_block.md

> Let scoping > Ai > Conditional expression in block
>
> Test let scoping with conditional expression in block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  $(x);
  const y = x ? $(3) : $(4);
  $(() => x);
  $(y);
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
  let x /*:unknown*/ = 1;
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(2);
    $(x);
  } else {
    $(x);
  }
  let y /*:unknown*/ /*ternaryConst*/ = undefined;
  if (x) {
    y = $(3);
  } else {
    y = $(4);
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(y);
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
  let x = 1;
  if ($(true)) {
    x = $(2);
    $(x);
  } else {
    $(x);
  }
  let y = undefined;
  if (x) {
    y = $(3);
  } else {
    y = $(4);
  }
  $(function () {
    return x;
  });
  $(y);
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
  let c = 1;
  const d = $( true );
  if (d) {
    c = $( 2 );
    $( c );
  }
  else {
    $( c );
  }
  let e = undefined;
  if (c) {
    e = $( 3 );
  }
  else {
    e = $( 4 );
  }
  const f = function() {
    debugger;
    return c;
  };
  $( f );
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(2);
    $(x);
  } else {
    $(x);
  }
  let y = undefined;
  if (x) {
    y = $(3);
  } else {
    y = $(4);
  }
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(y);
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
 - 5: 2
 - 6: 2
 - 7: 3
 - 8: '<function>'
 - 9: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
