# Preval test case

# regression.md

> Let if while x > Regression
>
> Uncovered a problem with SSA.
> The flag assignment got SSA'd, replacing the inner read but not the write

## Input

`````js filename=intro
let flag = false;
const t = $(5);
const x = 0 < t;
flag = x;
while (true) {
  if (flag) {
    $(`inner`);
    flag = false;
  } else {
    break;
  }
}
`````

## Pre Normal


`````js filename=intro
let flag = false;
const t = $(5);
const x = 0 < t;
flag = x;
while (true) {
  if (flag) {
    $(`inner`);
    flag = false;
  } else {
    break;
  }
}
`````

## Normalized


`````js filename=intro
let flag = false;
const t = $(5);
const x = 0 < t;
flag = x;
while (true) {
  if (flag) {
    $(`inner`);
    flag = false;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const t /*:unknown*/ = $(5);
const x /*:boolean*/ = 0 < t;
if (x) {
  $(`inner`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 5 );
const b = 0 < a;
if (b) {
  $( "inner" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
