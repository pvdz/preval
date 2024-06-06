# Preval test case

# opt_prop_nonopt_prop_call_undef.md

> Normalize > Optional > Opt prop nonopt prop call undef
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = undefined;
a?.b.c(1);
`````

## Pre Normal


`````js filename=intro
const a = undefined;
a?.b.c(1);
`````

## Normalized


`````js filename=intro
const a = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 1);
} else {
}
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
