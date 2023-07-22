# Preval test case

# write_if_write_else_none.md

> Ref tracking > Write if write else none
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = $(1);
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
if ($) {
  x = $(1);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
if ($) {
  x = $(1);
} else {
}
$(x);
`````

## Output

`````js filename=intro
if ($) {
  const tmpClusterSSA_x = $(1);
  $(tmpClusterSSA_x);
} else {
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
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
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
