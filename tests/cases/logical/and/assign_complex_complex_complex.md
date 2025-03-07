# Preval test case

# assign_complex_complex_complex.md

> Logical > And > Assign complex complex complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = $(1) && $(2));
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
} else {
  $(x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (x) {
  $($(2));
} else {
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$((x = $(1) && $(2)));
`````

## Normalized


`````js filename=intro
let x = undefined;
x = $(1);
if (x) {
  x = $(2);
} else {
}
let tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  $( b );
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
