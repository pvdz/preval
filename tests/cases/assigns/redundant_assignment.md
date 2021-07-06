# Preval test case

# redundant_assignment.md

> Assigns > Redundant assignment
>
> We should eliminate the writes when we know they're redundant

#TODO

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = 1;
} else {
  x = 2;
}
$(x + $('prevent inlining'));
`````

## Pre Normal

`````js filename=intro
let x = 1;
if ($) {
  x = 1;
} else {
  x = 2;
}
$(x + $(`prevent inlining`));
`````

## Normalized

`````js filename=intro
let x = 1;
if ($) {
  x = 1;
} else {
  x = 2;
}
const tmpCallCallee = $;
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(`prevent inlining`);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpBinBothLhs = 1;
if ($) {
} else {
  tmpBinBothLhs = 2;
}
const tmpBinBothRhs = $(`prevent inlining`);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
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
