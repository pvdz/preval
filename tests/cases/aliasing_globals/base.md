# Preval test case

# base.md

> Aliasing globals > Base
>
> Common artifact for normalization is to put all idents in a temp constant to make sure they don't mutate.

## Input

`````js filename=intro
const a = unknown1;
const b = unknown2;
const c = unknown3;
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
const a = unknown1;
const b = unknown2;
const c = unknown3;
$(a, b, c);
`````

## Normalized


`````js filename=intro
const a = unknown1;
const b = unknown2;
const c = unknown3;
$(a, b, c);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = unknown1;
const b /*:unknown*/ = unknown2;
const c /*:unknown*/ = unknown3;
$(a, b, c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = unknown1;
const b = unknown2;
const c = unknown3;
$( a, b, c );
`````

## Globals

BAD@! Found 3 implicit global bindings:

unknown1, unknown2, unknown3

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
