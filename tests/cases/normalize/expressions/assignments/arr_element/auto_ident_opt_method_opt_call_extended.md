# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) + (a = b?.c.d.e?.(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) + (a = b?.c.d.e?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
  } else {
  }
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$3 = tmpChainRootProp$1 != null;
if (tmpIfTest$3) {
  const tmpChainElementObject$5 = tmpChainRootProp$1.c;
  const tmpChainElementObject$7 = tmpChainElementObject$5.d;
  const tmpChainElementObject$9 = tmpChainElementObject$7.e;
  const tmpIfTest$5 = tmpChainElementObject$9 != null;
  if (tmpIfTest$5) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpChainElementObject$7, 1);
    a = tmpChainElementCall$1;
  } else {
  }
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpIfTest$1 = $ == null;
let tmpBinBothLhs = undefined;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
  tmpBinBothLhs = tmpChainElementCall;
}
let tmpClusterSSA_a = undefined;
const tmpChainElementObject$9 = tmpObjLitVal$1.e;
const tmpIfTest$5 = tmpChainElementObject$9 == null;
if (tmpIfTest$5) {
  const tmpClusterSSA_tmpCalleeParam = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, 1);
  tmpClusterSSA_a = tmpChainElementCall$1;
  const tmpClusterSSA_tmpCalleeParam$1 = tmpBinBothLhs + tmpChainElementCall$1;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { e: $ };
const b = $ == null;
let c = undefined;
if (b) {

}
else {
  const d = $dotCall( $, a, 1 );
  c = d;
}
let e = undefined;
const f = a.e;
const g = f == null;
if (g) {
  const h = c + undefined;
  $( h );
}
else {
  const i = $dotCall( f, a, 1 );
  e = i;
  const j = c + i;
  $( j );
}
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
