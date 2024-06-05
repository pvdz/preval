# Preval test case

# block_elim_regression.md

> Labels > Block elim regression
>
> This case was ending with A being initialized to "oops" rather than keeping the call to "mefirst"

## Input

`````js filename=intro
let A = $('mefirst');
loopStop: {
  A = `oops`;
  break loopStop;
}
$(A);
`````

## Pre Normal

`````js filename=intro
let A = $(`mefirst`);
loopStop: {
  A = `oops`;
  break loopStop;
}
$(A);
`````

## Normalized

`````js filename=intro
let A = $(`mefirst`);
A = `oops`;
$(A);
`````

## Output

`````js filename=intro
$(`mefirst`);
$(`oops`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "mefirst" );
$( "oops" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'mefirst'
 - 2: 'oops'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
