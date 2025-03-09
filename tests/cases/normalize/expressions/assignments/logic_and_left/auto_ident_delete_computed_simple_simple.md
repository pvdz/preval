# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident delete computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg["y"]) && $(100));
$(a, arg);
`````

## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(true, arg);
} else {
  $(false);
  $(false, arg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
if (delete arg.y) {
  $($(100));
  $(true, arg);
} else {
  $(false);
  $(false, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete arg[`y`]) && $(100));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete arg.y;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, arg);
} else {
  $(tmpCalleeParam);
  $(a, arg);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
if (b) {
  const c = $( 100 );
  $( c );
  $( true, a );
}
else {
  $( false );
  $( false, a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
