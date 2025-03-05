# Preval test case

# opt_prop_nonopt_prop_undef_b.md

> Normalize > Optional > Opt prop nonopt prop undef b
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {};
$(a?.b.c);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a?.b.c);
`````

## Normalized


`````js filename=intro
const a = {};
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  tmpCalleeParam = tmpChainElementObject$1;
} else {
}
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
$(tmpChainElementObject$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
