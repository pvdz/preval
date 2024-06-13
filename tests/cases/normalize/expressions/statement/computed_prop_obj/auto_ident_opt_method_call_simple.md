# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
let obj = {};
(b?.c(1))["a"];
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let obj = {};
(b?.c(1))[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  tmpCompObj = tmpChainElementCall;
} else {
}
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const b = { c: $ };
const a = { a: 999, b: 1000 };
const tmpChainElementCall = $dotCall($, b, 1);
tmpChainElementCall.a;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = {
  a: 999,
  b: 1000,
};
const c = $dotCall( $, a, 1 );
c.a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
