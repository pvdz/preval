# Preval test case

# _base_call_undef.md

> Normalize > Optional > Base call undef
>
> Simple example

## Input

`````js filename=intro
var f = undefined;
$(f?.());
`````

## Pre Normal


`````js filename=intro
let f = undefined;
f = undefined;
$(f?.());
`````

## Normalized


`````js filename=intro
let f = undefined;
f = undefined;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
} else {
}
$(tmpCalleeParam);
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
