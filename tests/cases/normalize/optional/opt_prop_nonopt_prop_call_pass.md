# Preval test case

# opt_prop_nonopt_prop_call_pass.md

> Normalize > Optional > Opt prop nonopt prop call pass
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {c: $}};
a?.b.c(1);
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: $ } };
a?.b.c(1);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementCall = tmpChainElementObject.c(1);
} else {
}
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:object*/ = { c: $ };
tmpObjLitVal.c(1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
a.c( 1 );
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
