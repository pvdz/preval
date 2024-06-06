# Preval test case

# opt_prop_nonopt_prop_opt_call_pass.md

> Normalize > Optional > Opt prop nonopt prop opt call pass
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = {b: {c: $}};
a?.b.c?.(1);
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: $ } };
a?.b.c?.(1);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 1);
  } else {
  }
} else {
}
`````

## Output


`````js filename=intro
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal = { c: $ };
  $dotCall($, tmpObjLitVal, 1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ == null;
if (a) {

}
else {
  const b = { c: $ };
  $dotCall( $, b, 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
