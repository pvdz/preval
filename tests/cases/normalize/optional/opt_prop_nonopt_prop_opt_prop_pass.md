# Preval test case

# opt_prop_nonopt_prop_opt_prop_pass.md

> Normalize > Optional > Opt prop nonopt prop opt prop pass
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {c: {d: 100}}};
$(a?.b.c?.d);
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: { d: 100 } } };
$(a?.b.c?.d);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { d: 100 };
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$3 = tmpChainElementObject$1.d;
    tmpCalleeParam = tmpChainElementObject$3;
  } else {
  }
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(100);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
