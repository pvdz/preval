# Preval test case

# multi_bit_and_x_neq_x.md

> Bit hacks > And x if > And x if neq > Multi bit and x neq x
>
> In some cases we can predict bitwise results or meta results

#TODO

## Input

`````js filename=intro
const x = $(200);
const y = x & 200;
if (y !== 200) {
  $('fail');
} else {
  $('pass');
}
`````

## Pre Normal

`````js filename=intro
const x = $(200);
const y = x & 200;
if (y !== 200) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized

`````js filename=intro
const x = $(200);
const y = x & 200;
const tmpIfTest = y !== 200;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output

`````js filename=intro
const x = $(200);
const y = x & 200;
const tmpIfTest = y === 200;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 200 );
const b = a & 200;
const c = b === 200;
if (c) {
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
 - 1: 200
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
