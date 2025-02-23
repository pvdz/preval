# Preval test case

# write_if_write_else_read.md

> Tofix > write if write else read
>
> Ref tracking cases
>
> In this case the init is a Simple and can be moved inside

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  $(x);
}
`````

## Output


`````js filename=intro
if ($) {
  const tmpClusterSSA_x = $(2);
  $(tmpClusterSSA_x);
} else {
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 2 );
  $( a );
}
else {
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
