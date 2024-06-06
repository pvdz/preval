# Preval test case

# switch_default_block.md

> Normalize > Blocks > Switch default block
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  default: {
    $(3);
  }
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    {
      $(3);
    }
  } else {
  }
}
`````

## Normalized


`````js filename=intro
const tmpSwitchDisc = $(1);
$(3);
`````

## Output


`````js filename=intro
$(1);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
