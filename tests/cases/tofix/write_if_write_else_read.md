# Preval test case

# write_if_write_else_read.md

> Tofix > Write if write else read
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
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
if ($) {
  a = $( 2 );
  $( a );
}
else {
  $( a );
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
