# Preval test case

# opt_prop_nonopt_prop_opt_call_undef_obj.md

> Normalize > Optional > Opt prop nonopt prop opt call undef obj
>
> Make sure this works properly

## Input

`````js filename=intro
const a = undefined;
a?.b.c?.(1);
`````

## Pre Normal


`````js filename=intro
const a = undefined;
a?.b.c?.(1);
`````

## Normalized


`````js filename=intro
const a = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 1);
  } else {
  }
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
