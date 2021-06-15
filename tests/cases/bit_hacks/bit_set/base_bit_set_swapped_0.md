# Preval test case

# base_bit_set_swapped_0.md

> Bit hacks > Bit set > Base bit set swapped 0
>
> Specific pattern of checking if a bit is set

#TODO

## Input

`````js filename=intro
const v = $(0);
const and = 64 & v;
const set = and === 64;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Pre Normal

`````js filename=intro
const v = $(0);
const and = 64 & v;
const set = and === 64;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized

`````js filename=intro
const v = $(0);
const and = 64 & v;
const set = and === 64;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output

`````js filename=intro
const v = $(0);
const and = 64 & v;
if (and) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
