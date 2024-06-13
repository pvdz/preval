# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Logic or left > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
b?.c(1) || $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
b?.c(1) || $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  tmpIfTest = tmpChainElementCall;
} else {
}
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## Output


`````js filename=intro
const b = { c: $ };
const a = { a: 999, b: 1000 };
const tmpChainElementCall = $dotCall($, b, 1);
if (tmpChainElementCall) {
} else {
  $(100);
}
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
if (c) {

}
else {
  $( 100 );
}
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
