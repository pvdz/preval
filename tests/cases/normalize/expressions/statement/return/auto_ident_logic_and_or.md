# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Return > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return ($($(1)) && $($(1))) || $($(2));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpReturnArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpReturnArg) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpReturnArg = $(tmpCalleeParam$1);
} else {
}
if (tmpReturnArg) {
  $(tmpReturnArg);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpCalleeParam$5 /*:unknown*/ = $(tmpCalleeParam$3);
  $(tmpCalleeParam$5);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpReturnArg = $($(1));
if (tmpReturnArg) {
  tmpReturnArg = $($(1));
}
if (tmpReturnArg) {
  $(tmpReturnArg);
} else {
  $($($(2)));
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  $( b );
}
else {
  const d = $( 2 );
  const e = $( d );
  $( e );
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = $(1);
  let tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    let tmpCalleeParam$1 = $(1);
    tmpReturnArg = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    let tmpCalleeParam$3 = $(2);
    tmpReturnArg = $(tmpCalleeParam$3);
    return tmpReturnArg;
  }
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
