# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$({ ...(a = b?.c(1)) });
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
$({ ...(a = b?.c(1)) });
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  a = tmpChainElementCall;
} else {
}
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b = { c: $ };
const tmpChainElementCall = $dotCall($, b, 1);
const tmpCalleeParam = { ...tmpChainElementCall };
$(tmpCalleeParam);
$(tmpChainElementCall);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, 1 );
const c = { ... b };
$( c );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
