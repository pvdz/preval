# Preval test case

# global_group_ident.md

> Normalize > Optional > Global group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
const a = {x: 1}
const y = (1, a)?.x
$(y);
`````

## Pre Normal


`````js filename=intro
const a = { x: 1 };
const y = (1, a)?.x;
$(y);
`````

## Normalized


`````js filename=intro
const a = { x: 1 };
let y = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  y = tmpChainElementObject;
} else {
}
$(y);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
