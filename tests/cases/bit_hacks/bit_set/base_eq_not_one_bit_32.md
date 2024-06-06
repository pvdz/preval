# Preval test case

# base_eq_not_one_bit_32.md

> Bit hacks > Bit set > Base eq not one bit 32
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

#TODO

## Input

`````js filename=intro
const v = $(32);
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
const v = $(32);
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
const v = $(32);
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
const v = $(32);
v ** 0;
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 32 );
a ** 0;
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 32
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
