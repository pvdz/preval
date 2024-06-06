# Preval test case

# global_call_prop.md

> Normalize > Optional > Global call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt(15)?.foo);
`````

## Pre Normal


`````js filename=intro
$(parseInt(15)?.foo);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = parseInt;
const tmpChainElementCall = tmpChainRootCall(15);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.foo;
  tmpCalleeParam = tmpChainElementObject;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementObject = (15).foo;
$(tmpChainElementObject);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 15.foo;
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
