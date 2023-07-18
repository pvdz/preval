# Preval test case

# single_bit_and_x_eq_0.md

> Bit hacks > And x if > And x if eq > Single bit and x eq 0
>
> In some cases we can predict bitwise results or meta results

#TODO

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y === 0) {
  $('fail');
} else {
  $('pass');
}
`````

## Pre Normal

`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y === 0) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const tmpIfTest = y === 0;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output

`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 32768 );
const b = a & 32768;
if (b) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 32768
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
