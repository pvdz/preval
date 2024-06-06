# Preval test case

# _base_prop_undef.md

> Normalize > Optional > Base prop undef
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = undefined;
$(f?.x);
`````

## Pre Normal


`````js filename=intro
let f = undefined;
f = undefined;
$(f?.x);
`````

## Normalized


`````js filename=intro
let f = undefined;
f = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = f;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpCalleeParam = tmpChainElementObject;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
