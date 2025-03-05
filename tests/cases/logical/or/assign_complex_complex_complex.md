# Preval test case

# assign_complex_complex_complex.md

> Logical > Or > Assign complex complex complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = $(1) || $(2));
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$((x = $(1) || $(2)));
`````

## Normalized


`````js filename=intro
let x = undefined;
x = $(1);
if (x) {
} else {
  x = $(2);
}
let tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(x);
} else {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( a );
}
else {
  const b = $( 2 );
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
