# Preval test case

# base_then.md

> If num zero falsy > Base then
>
> If an unknown value known to be a number is checked against zero, it is a falsy check, which may make things simpler for us.

## Input

`````js filename=intro
const x = $(1);
const a = x & $(1);
const atest = a === 0; // This is the same as !atest
if (atest) $('a');
else $('b');
`````

## Pre Normal


`````js filename=intro
const x = $(1);
const a = x & $(1);
const atest = a === 0;
if (atest) $(`a`);
else $(`b`);
`````

## Normalized


`````js filename=intro
const x = $(1);
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(1);
const a = tmpBinBothLhs & tmpBinBothRhs;
const atest = a === 0;
if (atest) {
  $(`a`);
} else {
  $(`b`);
}
`````

## Output


`````js filename=intro
const x = $(1);
const tmpBinBothRhs = $(1);
const a /*:number*/ = x & tmpBinBothRhs;
if (a) {
  $(`b`);
} else {
  $(`a`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a & b;
if (c) {
  $( "b" );
}
else {
  $( "a" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
