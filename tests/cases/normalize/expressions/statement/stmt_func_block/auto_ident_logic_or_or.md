# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $($(0)) || $($(1)) || $($(2));
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    $(a);
    $(undefined);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
    $(a);
    $(undefined);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $($(0));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  if ($($(1))) {
    $(a);
    $(undefined);
  } else {
    $($(2));
    $(a);
    $(undefined);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
  $( undefined );
}
else {
  const d = $( 1 );
  const e = $( d );
  if (e) {
    $( c );
    $( undefined );
  }
  else {
    const f = $( 2 );
    $( f );
    $( c );
    $( undefined );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
