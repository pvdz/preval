# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$({ x: (a = b?.c.d.e(1)) });
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$({ x: (a = b?.c.d.e(1)) });
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementCall = tmpChainElementObject$1.e(1);
  a = tmpChainElementCall;
} else {
}
let tmpObjLitVal$3 = a;
const tmpCalleeParam = { x: tmpObjLitVal$3 };
$(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
const tmpCalleeParam /*:object*/ = { x: tmpChainElementCall };
$(tmpCalleeParam);
$(tmpChainElementCall);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { e: $ };
const b = a.e( 1 );
const c = { x: b };
$( c );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
