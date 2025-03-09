# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = function () {}) : $(200));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpNestedComplexRhs /*:()=>undefined*/ = function () {
    debugger;
    return undefined;
  };
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpNestedComplexRhs = function () {};
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  $(1)
    ? (a = function () {
        debugger;
      })
    : $(200),
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpNestedComplexRhs = function () {
    debugger;
    return undefined;
  };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = function() {
    debugger;
    return undefined;
  };
  $( b );
  $( b );
}
else {
  const c = $( 200 );
  $( c );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: '<function>'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
