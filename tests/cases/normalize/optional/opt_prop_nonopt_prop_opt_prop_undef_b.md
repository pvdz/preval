# Preval test case

# opt_prop_nonopt_prop_opt_prop_undef_b.md

> Normalize > Optional > Opt prop nonopt prop opt prop undef b
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = {};
$(a?.b.c?.d);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a?.b.c?.d);
`````

## Normalized


`````js filename=intro
const a = {};
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
const tmpChainElementObject = $ObjectPrototype.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
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
const a = $ObjectPrototype.b;
const b = a.c;
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = b.d;
  $( d );
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
