# Preval test case

# surviving_let_catch_only.md

> Let scoping > Ai > Surviving let catch only
>
> Test let scoping: let used only in catch block that survives and should be moved

## Input

`````js filename=intro
let x = 1;
$(2);
if ($(true)) { $(false); } else {}
try {
  throw $(3);
} catch (e) {
  if ($(true)) x = $(4);
  if ($(true)) x = $(5);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
$(2);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
try {
  const tmpThrowArg /*:unknown*/ = $(3);
  throw tmpThrowArg;
} catch (e) {
  const tmpIfTest$1 /*:unknown*/ = $(true);
  if (tmpIfTest$1) {
    x = $(4);
  } else {
  }
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(5);
  } else {
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
$(2);
if ($(true)) {
  $(false);
}
try {
  const tmpThrowArg = $(3);
  throw tmpThrowArg;
} catch (e) {
  if ($(true)) {
    x = $(4);
  }
  if ($(true)) {
    x = $(5);
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
let a = 1;
$( 2 );
const b = $( true );
if (b) {
  $( false );
}
try {
  const c = $( 3 );
  throw c;
}
catch (d) {
  const e = $( true );
  if (e) {
    a = $( 4 );
  }
  const f = $( true );
  if (f) {
    a = $( 5 );
  }
  const g = function() {
    debugger;
    return a;
  };
  $( g );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
$(2);
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
try {
  const tmpThrowArg = $(3);
  throw tmpThrowArg;
} catch (e) {
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    x = $(4);
  } else {
  }
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(5);
  } else {
  }
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: true
 - 3: false
 - 4: 3
 - 5: true
 - 6: 4
 - 7: true
 - 8: 5
 - 9: '<function>'
 - 10: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
