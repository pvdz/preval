# Preval test case

# member_computed.md

> Normalize > Nullish > Member computed
>
> nullish chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x??[20]);
`````

## Pre Normal


`````js filename=intro
const x = 10;
$(x ?? [20]);
`````

## Normalized


`````js filename=intro
const x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = x;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = [20];
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
