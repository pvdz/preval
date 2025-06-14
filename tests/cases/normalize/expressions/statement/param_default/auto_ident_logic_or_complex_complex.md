# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(0)) || $($(2))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpClusterSSA_p /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_p) {
  $(undefined);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  $(tmpCalleeParam$1);
  $(undefined);
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($($(0))) {
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
const a = $( 0 );
const b = $( a );
if (b) {
  $( undefined );
}
else {
  const c = $( 2 );
  $( c );
  $( undefined );
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
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
    let tmpCalleeParam = $(0);
    p = $(tmpCalleeParam);
    if (p) {
      return undefined;
    } else {
      let tmpCalleeParam$1 = $(2);
      p = $(tmpCalleeParam$1);
      return undefined;
    }
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
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
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
