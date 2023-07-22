# Preval test case

# write_if_read_else_none.md

> Ref tracking > Write if read else none
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
let x = $(1);
if ($) {
  $(x);
}
`````

## Pre Normal

`````js filename=intro
let x = $(1);
if ($) {
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = $(1);
if ($) {
  $(x);
} else {
}
`````

## Output

`````js filename=intro
const x = $(1);
if ($) {
  $(x);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if ($) {
  $( a );
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
