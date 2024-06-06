# Preval test case

# opt_prop_nonopt_prop_undef_c.md

> Normalize > Optional > Opt prop nonopt prop undef c
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = {b: {}};
$(a?.b.c);
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$(a?.b.c);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  tmpCalleeParam = tmpChainElementObject$1;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementObject$1 = $ObjectPrototype.c;
$(tmpChainElementObject$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.c;
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
