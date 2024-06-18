# Preval test case

# opt_prop_nonopt_prop_opt_prop_undef_c.md

> Normalize > Optional > Opt prop nonopt prop opt prop undef c
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {}};
$(a?.b.c?.d);
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$(a?.b.c?.d);
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
const tmpChainElementObject$1 = $ObjectPrototype.c;
const tmpIfTest$1 = tmpChainElementObject$1 == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject$3 = tmpChainElementObject$1.d;
  $(tmpChainElementObject$3);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.c;
const b = a == null;
if (b) {
  $( undefined );
}
else {
  const c = a.d;
  $( c );
}
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
