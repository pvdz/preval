# Preval test case

# base.md

> Redundant writes > Base

## Input

`````js filename=intro
let n = 1;
if ($(true)) {
  n = 2;
} else {
  n = 3;
}
$(n);
`````

## Pre Normal


`````js filename=intro
let n = 1;
if ($(true)) {
  n = 2;
} else {
  n = 3;
}
$(n);
`````

## Normalized


`````js filename=intro
let n = 1;
const tmpIfTest = $(true);
if (tmpIfTest) {
  n = 2;
} else {
  n = 3;
}
$(n);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(2);
} else {
  $(3);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 2 );
}
else {
  $( 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
