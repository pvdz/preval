# Preval test case

# base.md

> Branch constants > Base
>
> When unknown values are conditionally known, we can at least inline them in that branch.

## Input

`````js filename=intro
const x = $(100);
if (x === 100) {
  $(x);
} else {
  $('nope');
}
`````

## Pre Normal


`````js filename=intro
const x = $(100);
if (x === 100) {
  $(x);
} else {
  $(`nope`);
}
`````

## Normalized


`````js filename=intro
const x = $(100);
const tmpIfTest = x === 100;
if (tmpIfTest) {
  $(x);
} else {
  $(`nope`);
}
`````

## Output


`````js filename=intro
const x = $(100);
const tmpIfTest = x === 100;
if (tmpIfTest) {
  $(100);
} else {
  $(`nope`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = a === 100;
if (b) {
  $( 100 );
}
else {
  $( "nope" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
