# Preval test case

# single_bit_and_x_neq_x.md

> Bit hacks > And x if > And x if neq blocked > Single bit and x neq x
>
> In some cases we can predict bitwise results or meta results

#TODO

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
$(y);
if (y !== 32768) {
  $('fail');
} else {
  $('pass');
}
`````

## Pre Normal

`````js filename=intro
const x = $(32768);
const y = x & 32768;
$(y);
if (y !== 32768) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized

`````js filename=intro
const x = $(32768);
const y = x & 32768;
$(y);
const tmpIfTest = y !== 32768;
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
$(y);
if (y) {
  $(`pass`);
} else {
  $(`fail`);
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
