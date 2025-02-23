# Preval test case

# base_and_not_one_bit_64.md

> Bit hacks > Bit set > Base and not one bit 64
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

This should not do the trick.

## Input

`````js filename=intro
const v = $(64);
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
const v = $(64);
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
const v = $(64);
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
const v /*:unknown*/ = $(64);
const and /*:number*/ = v & 65;
const set /*:boolean*/ = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 64 );
const b = a & 65;
const c = b === 64;
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
 - 1: 64
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
