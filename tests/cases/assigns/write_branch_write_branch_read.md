# Preval test case

# write_branch_write_branch_read.md

> Assigns > Write branch write branch read
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
if ($(10)) {
  x = $(2);
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if ($(10)) {
  x = $(2);
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  x = $(2);
  $(x);
} else {
}
`````

## Output


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(10);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 10 );
if (a) {
  const b = $( 2 );
  $( b );
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
