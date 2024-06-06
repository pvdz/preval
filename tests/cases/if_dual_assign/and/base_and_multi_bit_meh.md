# Preval test case

# base_and_multi_bit_meh.md

> If dual assign > And > Base and multi bit meh
>
> A single bit AND means the result is one of two values and they are falsy and truthy so when it's the condition of an `if`, each branch knows the value.

#TODO

## Input

`````js filename=intro
const x = $(5) & 33;
if (x) {
  $('pass', x);
} else {
  $('fail', x);
}
`````

## Pre Normal


`````js filename=intro
const x = $(5) & 33;
if (x) {
  $(`pass`, x);
} else {
  $(`fail`, x);
}
`````

## Normalized


`````js filename=intro
const tmpBinLhs = $(5);
const x = tmpBinLhs & 33;
if (x) {
  $(`pass`, x);
} else {
  $(`fail`, x);
}
`````

## Output


`````js filename=intro
const tmpBinLhs = $(5);
const x = tmpBinLhs & 33;
if (x) {
  $(`pass`, x);
} else {
  $(`fail`, x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 5 );
const b = a & 33;
if (b) {
  $( "pass", b );
}
else {
  $( "fail", b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 'pass', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
