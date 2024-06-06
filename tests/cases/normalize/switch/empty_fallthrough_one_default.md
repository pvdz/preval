# Preval test case

# empty_fallthrough_one_default.md

> Normalize > Switch > Empty fallthrough one default
>
> Do cases spy

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  default:
}
$();
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
  } else {
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
