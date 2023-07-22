# Preval test case

# write_simple_if_write_else_write_read.md

> Ref tracking > Write simple if write else write read
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
  x = $(3);
  $(x);
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  x = $(3);
  $(x);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  x = $(3);
  $(x);
}
$(x);
`````

## Output

`````js filename=intro
let x = 1;
if ($) {
  x = $(2);
  $(x);
} else {
  x = $(3);
  $(x);
}
$(x);
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
  a = $( 3 );
  $( a );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
