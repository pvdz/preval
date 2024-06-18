# Preval test case

# single_bit_and_x_neq_z.md

> Bit hacks > And x if > And x if neq > Single bit and x neq z
>
> In some cases we can predict bitwise results or meta results

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y !== 32769) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal


`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y !== 32769) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized


`````js filename=intro
const x = $(32768);
const y = x & 32768;
const tmpIfTest = y !== 32769;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output


`````js filename=intro
const x = $(32768);
x ** 0;
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 32768 );
a ** 0;
$( "pass" );
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
