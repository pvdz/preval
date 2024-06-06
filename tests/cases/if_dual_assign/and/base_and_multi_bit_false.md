# Preval test case

# base_and_multi_bit_false.md

> If dual assign > And > Base and multi bit false
>
> A single bit AND means the result is one of two values and they are falsy and truthy so when it's the condition of an `if`, each branch knows the value.

#TODO

## Input

`````js filename=intro
const x = $(0) & 33;
if (x) {
  $('fail', x);
} else {
  $(`pass`, x);
}
`````

## Pre Normal


`````js filename=intro
const x = $(0) & 33;
if (x) {
  $(`fail`, x);
} else {
  $(`pass`, x);
}
`````

## Normalized


`````js filename=intro
const tmpBinLhs = $(0);
const x = tmpBinLhs & 33;
if (x) {
  $(`fail`, x);
} else {
  $(`pass`, x);
}
`````

## Output


`````js filename=intro
const tmpBinLhs = $(0);
const x = tmpBinLhs & 33;
if (x) {
  $(`fail`, x);
} else {
  $(`pass`, x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = a & 33;
if (b) {
  $( "fail", b );
}
else {
  $( "pass", b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'pass', 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
