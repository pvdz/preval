# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = ($($(1)) && $($(1))) || $($(2)))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpNestedComplexRhs = $(tmpCalleeParam$1);
} else {
}
if (tmpNestedComplexRhs) {
  $(undefined);
  $(tmpNestedComplexRhs);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$3);
  $(undefined);
  $(tmpClusterSSA_a$3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpNestedComplexRhs = $($(1));
if (tmpNestedComplexRhs) {
  tmpNestedComplexRhs = $($(1));
}
if (tmpNestedComplexRhs) {
  $(undefined);
  $(tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_a$3 = $($(2));
  $(undefined);
  $(tmpClusterSSA_a$3);
}
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
  $( b );
}
else {
  const d = $( 2 );
  const e = $( d );
  $( undefined );
  $( e );
}
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
    let tmpNestedComplexRhs = $(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
      let tmpCalleeParam$1 = $(1);
      tmpNestedComplexRhs = $(tmpCalleeParam$1);
    } else {
    }
    if (tmpNestedComplexRhs) {
    } else {
      let tmpCalleeParam$3 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$3);
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
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
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
