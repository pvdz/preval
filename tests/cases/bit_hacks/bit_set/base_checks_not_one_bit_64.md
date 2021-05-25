# Preval test case

# base_checks_not_one_bit_64.md

> Bit hacks > Bit set > Base checks not one bit 64
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

#TODO

## Input

`````js filename=intro
const v = $(64);
const and = v & 65;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Pre Normal

`````js filename=intro
const v = $(64);
const and = v & 65;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Normalized

`````js filename=intro
const v = $(64);
const and = v & 65;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Output

`````js filename=intro
const v = $(64);
const and = v & 65;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 64
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same