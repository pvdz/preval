# Preval test case

# write_read_branch_write.md

> Assigns > Write read branch write
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
if ($(10)) $(x, 'branch')
x = $(2);
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if ($(10)) $(x, `branch`);
x = $(2);
$(x);
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  $(x, `branch`);
} else {
}
x = $(2);
$(x);
`````

## Output


`````js filename=intro
const x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  $(x, `branch`);
} else {
}
const tmpClusterSSA_x = $(2);
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 10 );
if (b) {
  $( a, "branch" );
}
const c = $( 2 );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 1, 'branch'
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
