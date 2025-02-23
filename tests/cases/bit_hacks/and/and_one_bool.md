# Preval test case

# and_one_bool.md

> Bit hacks > And > And one bool
>
> This is basically a bool check but can be generic

## Input

`````js filename=intro
const x = $(1) & 1;
let y = x & 1
if (y === 1) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal


`````js filename=intro
const x = $(1) & 1;
let y = x & 1;
if (y === 1) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized


`````js filename=intro
const tmpBinLhs = $(1);
const x = tmpBinLhs & 1;
let y = x & 1;
const tmpIfTest = y === 1;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(1);
const x /*:number*/ = tmpBinLhs & 1;
if (x) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a & 1;
if (b) {
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
 - 1: 1
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
