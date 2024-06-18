# Preval test case

# _base_computed_undef.md

> Normalize > Optional > Base computed undef
>
> Simple example

## Input

`````js filename=intro
var f = undefined;
var x = 10;
$(f?.[x]);
`````

## Pre Normal


`````js filename=intro
let f = undefined;
let x = undefined;
f = undefined;
x = 10;
$(f?.[x]);
`````

## Normalized


`````js filename=intro
let f = undefined;
let x = undefined;
f = undefined;
x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = f;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = x;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
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
