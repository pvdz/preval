# Preval test case

# bin_right_num.md

> If update var > Bin right num
>
> If a variable is conditionally set and then used in a binding after the `if`/`else`, we may be able to hoist the binding inside those branches.

The idea is that `x` will be replaced by `y` here.

## Input

`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
const y = 10 + x;
$(y);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
const y = 10 + x;
$(y);
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
const y = 10 + x;
$(y);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(110);
} else {
  $(210);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 110 );
}
else {
  $( 210 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 110
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
