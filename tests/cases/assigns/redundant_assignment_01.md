# Preval test case

# redundant_assignment_01.md

> Assigns > Redundant assignment 01
>
> We should eliminate the writes when we know they're redundant

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = 0;
} else {
  x = 1;
}
$(x + $('prevent inlining'));
`````

## Pre Normal


`````js filename=intro
let x = 1;
if ($) {
  x = 0;
} else {
  x = 1;
}
$(x + $(`prevent inlining`));
`````

## Normalized


`````js filename=intro
let x = 1;
if ($) {
  x = 0;
} else {
  x = 1;
}
const tmpCallCallee = $;
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(`prevent inlining`);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpBinBothLhs /*:number*/ = 0;
if ($) {
} else {
  tmpBinBothLhs = 1;
}
const tmpBinBothRhs = $(`prevent inlining`);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
if ($) {

}
else {
  a = 1;
}
const b = $( "prevent inlining" );
const c = a + b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'prevent inlining'
 - 2: '0prevent inlining'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
