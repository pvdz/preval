# Preval test case

# opt_prop_nonopt_prop_opt_call_undef_b.md

> Normalize > Optional > Opt prop nonopt prop opt call undef b
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {};
a?.b.c?.(1);
`````

## Pre Normal


`````js filename=intro
const a = {};
a?.b.c?.(1);
`````

## Normalized


`````js filename=intro
const a = {};
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
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
if (tmpIfTest$1) {
} else {
  $dotCall(tmpChainElementObject$1, tmpChainElementObject, 1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b == null;
if (c) {

}
else {
  $dotCall( b, a, 1 );
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
