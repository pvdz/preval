# Preval test case

# write_write_branch.md

> Assigns > Write write branch
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
if ($(10)) x = $(2);
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if ($(10)) x = $(2);
$(x);
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  x = $(2);
} else {
}
$(x);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(10);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
} else {
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 10 );
if (b) {
  const c = $( 2 );
  $( c );
}
else {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
