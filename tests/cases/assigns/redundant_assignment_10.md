# Preval test case

# redundant_assignment_10.md

> Assigns > Redundant assignment 10
>
> We should eliminate the writes when we know they're redundant

## Input

`````js filename=intro
let x = 0;
if ($) {
  x = 1;
} else {
  x = 0;
}
$(x + $('prevent inlining'));
`````

## Pre Normal


`````js filename=intro
let x = 0;
if ($) {
  x = 1;
} else {
  x = 0;
}
$(x + $(`prevent inlining`));
`````

## Normalized


`````js filename=intro
let x = 0;
if ($) {
  x = 1;
} else {
  x = 0;
}
const tmpCallCallee = $;
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(`prevent inlining`);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpBinBothLhs /*:number*/ = 1;
if ($) {
} else {
  tmpBinBothLhs = 0;
}
const tmpBinBothRhs = $(`prevent inlining`);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
if ($) {

}
else {
  a = 0;
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
 - 2: '1prevent inlining'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
