# Preval test case

# single_bit_and_x_neq_0.md

> Bit hacks > And x if > And x if neq blocked > Single bit and x neq 0
>
> In some cases we can predict bitwise results or meta results

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
$(y);
if (y !== 0) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal


`````js filename=intro
const x = $(32768);
const y = x & 32768;
$(y);
if (y !== 0) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized


`````js filename=intro
const x = $(32768);
const y = x & 32768;
$(y);
const tmpIfTest = y !== 0;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output


`````js filename=intro
const x = $(32768);
const y /*:number*/ = x & 32768;
$(y);
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
$( b );
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
 - 2: 32768
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
