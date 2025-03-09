# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident cond complex s-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = $(1) ? (40, 50, 60) : $($(100));
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(60);
  $(undefined);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  $(tmpClusterSSA_a);
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(60);
  $(undefined);
} else {
  $($($(100)));
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = $(1) ? (40, 50, 60) : $($(100));
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = 60;
    $(a);
    return undefined;
  } else {
    const tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
    $(a);
    return undefined;
  }
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 60 );
  $( undefined );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
