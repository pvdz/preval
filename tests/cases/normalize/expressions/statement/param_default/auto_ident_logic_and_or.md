# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Param default > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = ($($(1)) && $($(1))) || $($(2))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpClusterSSA_p /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_p) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpClusterSSA_p = $(tmpCalleeParam$1);
} else {
}
if (tmpClusterSSA_p) {
  $(undefined);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  $(tmpCalleeParam$3);
  $(undefined);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpClusterSSA_p = $($(1));
if (tmpClusterSSA_p) {
  tmpClusterSSA_p = $($(1));
}
if (tmpClusterSSA_p) {
  $(undefined);
} else {
  $($(2));
  $(undefined);
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
  $( undefined );
}
else {
  const d = $( 2 );
  $( d );
  $( undefined );
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = $(1);
    p = $(tmpCalleeParam);
    if (p) {
      let tmpCalleeParam$1 = $(1);
      p = $(tmpCalleeParam$1);
    } else {
    }
    if (p) {
      return undefined;
    } else {
      let tmpCalleeParam$3 = $(2);
      p = $(tmpCalleeParam$3);
      return undefined;
    }
  } else {
    p = tmpParamBare;
    return undefined;
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
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
