# Preval test case

# base_eq_not_one_bit_1.md

> Bit hacks > Bit set > Base eq not one bit 1
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

## Input

`````js filename=intro
const v = $(1);
const and = v & 64;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Pre Normal


`````js filename=intro
const v = $(1);
const and = v & 64;
const set = and === 65;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized


`````js filename=intro
const v = $(1);
const and = v & 64;
const set = and === 65;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output


`````js filename=intro
const v = $(1);
v ** 0;
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
a ** 0;
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
