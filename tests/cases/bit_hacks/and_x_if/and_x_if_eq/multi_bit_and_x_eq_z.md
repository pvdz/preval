# Preval test case

# multi_bit_and_x_eq_z.md

> Bit hacks > And x if > And x if eq > Multi bit and x eq z
>
> In some cases we can predict bitwise results or meta results

#TODO

## Input

`````js filename=intro
const x = $(200);
const y = x & 200;
if (y === 3) {
  $('fail');
} else {
  $('pass');
}
`````

## Pre Normal

`````js filename=intro
const x = $(200);
const y = x & 200;
if (y === 3) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized

`````js filename=intro
const x = $(200);
const y = x & 200;
const tmpIfTest = y === 3;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output

`````js filename=intro
const x = $(200);
x ** 0;
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 200 );
a ** 0;
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 200
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
