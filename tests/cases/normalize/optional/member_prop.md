# Preval test case

# member_prop.md

> Normalize > Optional > Member prop
>
> Optional chaining fun

## Input

`````js filename=intro
const x = 10;
$(x?.length);
`````

## Pre Normal


`````js filename=intro
const x = 10;
$(x?.length);
`````

## Normalized


`````js filename=intro
const x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = x;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.length;
  tmpCalleeParam = tmpChainElementObject;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = (10).length;
$(tmpChainElementObject);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 10.length;
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
