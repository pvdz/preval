# Preval test case

# spread.md

> If update var > Spread
>
> If a variable is conditionally set and then used in a binding after the `if`/`else`, we may be able to hoist the binding inside those branches.

## Input

`````js filename=intro
const a = $([100, 200])
let x = undefined;
if ($(true)) {
  const r = [1, 2];
  x = r;
} else {
  const r = [3, 4];
  x = r;
}
const y = x;
$(...y);
`````

## Pre Normal


`````js filename=intro
const a = $([100, 200]);
let x = undefined;
if ($(true)) {
  const r = [1, 2];
  x = r;
} else {
  const r$1 = [3, 4];
  x = r$1;
}
const y = x;
$(...y);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [100, 200];
const a = $(tmpCalleeParam);
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const r = [1, 2];
  x = r;
} else {
  const r$1 = [3, 4];
  x = r$1;
}
const y = x;
$(...y);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [100, 200];
$(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(1, 2);
} else {
  $(3, 4);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 100, 200 ];
$( a );
const b = $( true );
if (b) {
  $( 1, 2 );
}
else {
  $( 3, 4 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [100, 200]
 - 2: true
 - 3: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
