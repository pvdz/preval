# Preval test case

# opt_prop_nonopt_prop_opt_call_pass_var.md

> Normalize > Optional > Opt prop nonopt prop opt call pass var
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {c: $}};
let x = a?.b.c?.(1);
$(x);
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: $ } };
let x = a?.b.c?.(1);
$(x);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
let x = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 1);
    x = tmpChainElementCall;
  } else {
  }
} else {
}
$(x);
`````

## Output


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpObjLitVal /*:object*/ = { c: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal, `c`, 1);
  $(tmpChainElementCall);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( undefined );
}
else {
  const b = { c: $ };
  const c = $dotCall( $, b, "c", 1 );
  $( c );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
