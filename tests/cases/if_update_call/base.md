# Preval test case

# base.md

> If update call > Base
>
> If a variable is conditionally set and then used in a call after the `if`/`else`, we can hoist the call inside those branches.

## Input

`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 100;
} else {
  x = 200;
}
$(x);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 100 );
}
else {
  $( 200 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
