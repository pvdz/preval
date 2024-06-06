# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
for (let x of (a = b?.c(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
for (let x of (a = b?.c(1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  a = tmpChainElementCall;
} else {
}
let tmpForOfDeclRhs = a;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const b = { c: $ };
const tmpChainElementCall = $dotCall($, b, 1);
let x = undefined;
for (x of tmpChainElementCall) {
}
$(tmpChainElementCall);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, 1 );
let c = undefined;
for (c of b) {

}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
