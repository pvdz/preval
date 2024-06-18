# Preval test case

# base_bit_set_swapped_32.md

> Bit hacks > Bit set > Base bit set swapped 32
>
> Specific pattern of checking if a bit is set

## Input

`````js filename=intro
const v = $(32);
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
const v = $(32);
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
const v = $(32);
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
const v = $(32);
const and = 64 & v;
if (and) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 32 );
const b = 64 & a;
if (b) {
  $( "fail" );
}
else {
  $( "pass" );
}
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
