# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a *= b?.c.d.e(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$((a *= b?.c.d.e(1)));
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
  const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
  tmpBinBothRhs = tmpChainElementCall;
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const a = { a: 999, b: 1000 };
const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
const tmpClusterSSA_a$1 = a * tmpChainElementCall;
$(tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { e: $ };
const b = {
  a: 999,
  b: 1000,
};
const c = $dotCall( $, a, 1 );
const d = b * c;
$( d );
$( d );
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
