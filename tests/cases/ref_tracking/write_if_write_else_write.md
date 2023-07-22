# Preval test case

# write_if_write_else_write.md

> Ref tracking > Write if write else write
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
let x = $(1);
if ($) {
  x = $(2);
  $(x);
} else {
  x = $(3);
  $(x);
}
`````

## Pre Normal

`````js filename=intro
let x = $(1);
if ($) {
  x = $(2);
  $(x);
} else {
  x = $(3);
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = $(1);
if ($) {
  x = $(2);
  $(x);
} else {
  x = $(3);
  $(x);
}
`````

## Output

`````js filename=intro
$(1);
if ($) {
  const tmpClusterSSA_x = $(2);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 = $(3);
  $(tmpClusterSSA_x$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
if ($) {
  const a = $( 2 );
  $( a );
}
else {
  const b = $( 3 );
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
