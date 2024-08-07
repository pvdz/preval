# Preval test case

# false_prop.md

> Normalize > Optional > False prop
>
> Empty string should make `?.` to return undefined.

## Input

`````js filename=intro
$(false?.toString());
`````

## Pre Normal


`````js filename=intro
$(false?.toString());
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = false;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootProp.toString();
  tmpCalleeParam = tmpChainElementCall;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`false`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "false" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
