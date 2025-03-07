# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = delete arg.y));
$(a, arg);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpNestedComplexRhs /*:boolean*/ = delete arg.y;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
const arg = { y: 1 };
if (tmpIfTest) {
  $($(100));
} else {
  const tmpNestedComplexRhs = delete arg.y;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = delete arg.y));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpNestedComplexRhs = delete arg.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 0 );
const c = { y: 1 };
if (b) {
  const d = $( 100 );
  $( d );
}
else {
  const e = delete c.y;
  a = e;
  $( e );
}
$( a, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: true
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
