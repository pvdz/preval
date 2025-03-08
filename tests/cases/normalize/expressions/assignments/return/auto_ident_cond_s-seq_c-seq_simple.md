# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)));
}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(60);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $(60);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = 30;
  if (tmpIfTest) {
    a = $(60);
    return a;
  } else {
    const tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
    return a;
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
const a = $( 60 );
$( a );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
