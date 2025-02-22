# Preval test case

# hex.md

> String escapes > Hex
>
> Welcome to the webcompat corner

## Input

`````js filename=intro
$("\x13\x17\x31\x08\x12\x29\x21\x22\x07\x16\x08\x07\x09");
`````

## Pre Normal


`````js filename=intro
$(`\u0013\u00171\u0012)!"\u0007\u0016\u0007\u0009`);
`````

## Normalized


`````js filename=intro
$(`\u0013\u00171\u0012)!"\u0007\u0016\u0007\u0009`);
`````

## Output


`````js filename=intro
$(`\u0013\u00171\u0012)!"\u0007\u0016\u0007\u0009`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "\u0013\u00171\u0008\u0012)!\"\u0007\u0016\u0008\u0007\u0009" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '\u0013\u00171\b\u0012)!"\u0007\u0016\b\u0007\t'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
