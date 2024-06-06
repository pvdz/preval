# Preval test case

# ctxt_opt_b_undef_b.md

> Normalize > Optional > Ctxt opt b undef b
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {};
$($(a).b?.c(100));
`````

## Pre Normal


`````js filename=intro
const a = {};
$($(a).b?.c(100));
`````

## Normalized


`````js filename=intro
const a = {};
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
const a = {};
const tmpChainElementCall = $(a);
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
const a = {};
const b = $( a );
const c = b.b;
const d = c == null;
if (d) {
  $( undefined );
}
else {
  const e = c.c;
  const f = $dotCall( e, c, 100 );
  $( f );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
