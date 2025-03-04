# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a *= b?.c.d.e?.(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$((a *= b?.c.d.e?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
    tmpBinBothRhs = tmpChainElementCall;
  } else {
  }
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let tmpClusterSSA_a /*:number*/ = NaN;
const tmpIfTest$1 /*:boolean*/ = $ == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  a ** 0;
  $(NaN);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  tmpClusterSSA_a = a * tmpChainElementCall;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = NaN;
const b = $ == null;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  c ** 0;
  $( NaN );
}
else {
  const d = { e: $ };
  const e = $dotCall( $, d, "e", 1 );
  a = c * e;
  $( a );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
