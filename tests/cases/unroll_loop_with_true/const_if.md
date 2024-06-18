# Preval test case

# const_if.md

> Unroll loop with true > Const if
>
> 

## Input

`````js filename=intro
if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $('PASS');
} else {
  $('FAIL');
}
`````

## Pre Normal


`````js filename=intro
if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`PASS`);
} else {
  $(`FAIL`);
}
`````

## Normalized


`````js filename=intro
$(`PASS`);
`````

## Output


`````js filename=intro
$(`PASS`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "PASS" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'PASS'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
