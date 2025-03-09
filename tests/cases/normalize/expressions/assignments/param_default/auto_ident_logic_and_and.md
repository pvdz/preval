# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(1)) && $($(1)) && $($(2)))) {}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpNestedComplexRhs) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpNestedComplexRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
  } else {
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
} else {
  $(undefined);
  $(tmpNestedComplexRhs);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $($(1));
if (tmpNestedComplexRhs) {
  const tmpClusterSSA_tmpNestedComplexRhs = $($(1));
  if (tmpClusterSSA_tmpNestedComplexRhs) {
    const tmpClusterSSA_tmpNestedComplexRhs$1 = $($(2));
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
  } else {
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
} else {
  $(undefined);
  $(tmpNestedComplexRhs);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $($(1)) && $($(1)) && $($(2))) : tmpParamBare;
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
    const tmpCalleeParam = $(1);
    let tmpNestedComplexRhs = $(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$1 = $(1);
      tmpNestedComplexRhs = $(tmpCalleeParam$1);
      if (tmpNestedComplexRhs) {
        const tmpCalleeParam$3 = $(2);
        tmpNestedComplexRhs = $(tmpCalleeParam$3);
      } else {
      }
    } else {
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
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( undefined );
    $( f );
  }
  else {
    $( undefined );
    $( d );
  }
}
else {
  $( undefined );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
