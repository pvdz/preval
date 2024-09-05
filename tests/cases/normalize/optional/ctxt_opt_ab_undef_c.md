# Preval test case

# ctxt_opt_ab_undef_c.md

> Normalize > Optional > Ctxt opt ab undef c
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {}};
$($(a)?.b?.c(100));
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$($(a)?.b?.c(100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = tmpChainElementObject.c(100);
    tmpCalleeParam = tmpChainElementCall$1;
  } else {
  }
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpChainElementCall = $(a);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$1 = tmpChainElementObject.c(100);
    tmpCalleeParam = tmpChainElementCall$1;
  }
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = {};
const c = { b: b };
const d = $( c );
const e = d == null;
if (e) {

}
else {
  const f = d.b;
  const g = f == null;
  if (g) {

  }
  else {
    const h = f.c( 100 );
    a = h;
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '{}' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
