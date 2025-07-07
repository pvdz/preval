# Preval test case

# try_catch_used_in_catch.md

> Let scoping > Ai > Try catch used in catch
>
> Test let scoping with try-catch: let used in catch block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
try {
  throw $(2);
} catch (e) {
  if ($(true)) x = $(3);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
try {
  const tmpThrowArg /*:unknown*/ = $(2);
  throw tmpThrowArg;
} catch (e) {
  const tmpIfTest$1 /*:unknown*/ = $(true);
  if (tmpIfTest$1) {
    x = $(3);
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
if ($(true)) {
  $(false);
}
try {
  const tmpThrowArg = $(2);
  throw tmpThrowArg;
} catch (e) {
  if ($(true)) {
    x = $(3);
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
const b = $( true );
if (b) {
  $( false );
}
try {
  const c = $( 2 );
  throw c;
}
catch (d) {
  const e = $( true );
  if (e) {
    a = $( 3 );
  }
  const f = function() {
    debugger;
    return a;
  };
  $( f );
  $( a );
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
try {
  const tmpThrowArg = $(2);
  throw tmpThrowArg;
} catch (e) {
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    x = $(3);
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
 - 1: true
 - 2: false
 - 3: 2
 - 4: true
 - 5: 3
 - 6: '<function>'
 - 7: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
