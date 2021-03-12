# Preval test case

# opt_prop_nonopt_prop_undef_b.md

> Normalize > Optional > Opt prop nonopt prop undef b
>
> Make sure this works properly

#TODO

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
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  tmpCalleeParam = tmpChainElementObject$1;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = {};
let tmpCalleeParam = undefined;
const tmpIfTest = a != null;
if (tmpIfTest) {
  const tmpChainElementObject = a.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  tmpCalleeParam = tmpChainElementObject$1;
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
