# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = (10, 20, $(30)) ? $(2) : $($(100)))) {}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(2);
  $(undefined);
  $(tmpClusterSSA_tmpNestedComplexRhs);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpNestedComplexRhs$1 /*:unknown*/ = $(tmpCalleeParam);
  $(undefined);
  $(tmpClusterSSA_tmpNestedComplexRhs$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(30)) {
  const tmpClusterSSA_tmpNestedComplexRhs = $(2);
  $(undefined);
  $(tmpClusterSSA_tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpNestedComplexRhs$1 = $($(100));
  $(undefined);
  $(tmpClusterSSA_tmpNestedComplexRhs$1);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = (10, 20, $(30)) ? $(2) : $($(100))) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      tmpNestedComplexRhs = $(2);
    } else {
      const tmpCalleeParam = $(100);
      tmpNestedComplexRhs = $(tmpCalleeParam);
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
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  const b = $( 2 );
  $( undefined );
  $( b );
}
else {
  const c = $( 100 );
  const d = $( c );
  $( undefined );
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: undefined
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
