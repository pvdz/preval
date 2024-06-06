# Preval test case

# ctxt_opt_b_undef_a.md

> Normalize > Optional > Ctxt opt b undef a
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = undefined;
$($(a).b?.c(100));
`````

## Pre Normal


`````js filename=intro
const a = undefined;
$($(a).b?.c(100));
`````

## Normalized


`````js filename=intro
const a = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainElementObject = tmpChainElementCall.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementCall = $(undefined);
const tmpChainElementObject = tmpChainElementCall.b;
const tmpIfTest = tmpChainElementObject == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  $(tmpChainElementCall$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( undefined );
const b = a.b;
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = b.c;
  const e = $dotCall( d, b, 100 );
  $( e );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
