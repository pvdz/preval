# Preval test case

# empty_switch.md

> Normalize > Switch > Empty switch
>
> Do cases spy

## Input

`````js filename=intro
switch ($(1)) {
}
$();
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  {
  }
}
$();
`````

## Normalized


`````js filename=intro
const tmpSwitchDisc = $(1);
$();
`````

## Output


`````js filename=intro
$(1);
$();
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
