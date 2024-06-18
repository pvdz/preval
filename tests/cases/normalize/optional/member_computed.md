# Preval test case

# member_computed.md

> Normalize > Optional > Member computed
>
> Optional chaining fun

## Input

`````js filename=intro
const x = 10;
$(x?.[20]);
`````

## Pre Normal


`````js filename=intro
const x = 10;
$(x?.[20]);
`````

## Normalized


`````js filename=intro
const x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = x;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = 20;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementObject = (10)[20];
$(tmpChainElementObject);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 10[ 20 ];
$( a );
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
