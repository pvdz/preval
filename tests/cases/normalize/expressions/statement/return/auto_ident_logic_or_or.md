# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Return > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(0)) || $($(1)) || $($(2));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpReturnArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpReturnArg) {
  $(tmpReturnArg);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpReturnArg) {
    $(tmpClusterSSA_tmpReturnArg);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpCalleeParam$5 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_tmpCalleeParam$5);
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpReturnArg = $($(0));
if (tmpReturnArg) {
  $(tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg = $($(1));
  if (tmpClusterSSA_tmpReturnArg) {
    $(tmpClusterSSA_tmpReturnArg);
  } else {
    $($($(2)));
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    $( d );
  }
  else {
    const e = $( 2 );
    const f = $( e );
    $( f );
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = $(0);
  let tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    let tmpCalleeParam$1 = $(1);
    tmpReturnArg = $(tmpCalleeParam$1);
    if (tmpReturnArg) {
      return tmpReturnArg;
    } else {
      let tmpCalleeParam$3 = $(2);
      tmpReturnArg = $(tmpCalleeParam$3);
      return tmpReturnArg;
    }
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
