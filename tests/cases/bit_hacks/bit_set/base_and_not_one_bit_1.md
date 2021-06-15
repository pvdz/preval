# Preval test case

# base_and_not_one_bit_1.md

> Bit hacks > Bit set > Base and not one bit 1
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

This should not do the trick.

#TODO

## Input

`````js filename=intro
const v = $(1);
const and = v & 65;
const set = and === 64;
if (set) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal

`````js filename=intro
const v = $(1);
const and = v & 65;
const set = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized

`````js filename=intro
const v = $(1);
const and = v & 65;
const set = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output

`````js filename=intro
const v = $(1);
const and = v & 65;
const set = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
