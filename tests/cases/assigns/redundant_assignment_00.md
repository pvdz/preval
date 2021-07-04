# Preval test case

# redundant_assignment_00.md

> Assigns > Redundant assignment 00
>
> We should eliminate the writes when we know they're redundant

#TODO

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = 0;
} else {
  x = 0;
}
$(x + $('prevent inlining'));
`````

## Pre Normal

`````js filename=intro
let x = 1;
if ($) {
  x = 0;
} else {
  x = 0;
}
$(x + $(`prevent inlining`));
`````

## Normalized

`````js filename=intro
let x = 1;
if ($) {
  x = 0;
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
let x = 0;
if ($) {
} else {
  x = 0;
}
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(`prevent inlining`);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
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
