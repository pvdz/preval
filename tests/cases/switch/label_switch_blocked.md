# Preval test case

# label_switch.md

> Switch > Label switch
>
> This did not triggered the edge case in the pre transform

## Input

`````js filename=intro
e: { switch (x) {} }
`````

## Pre Normal


`````js filename=intro
e: {
  tmpSwitchBreak: {
    const tmpSwitchDisc = x;
    {
    }
  }
}
`````

## Normalized


`````js filename=intro
const tmpSwitchDisc = x;
`````

## Output


`````js filename=intro
x;
`````

## PST Output

With rename=true

`````js filename=intro
x;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
