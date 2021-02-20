# Preval test case

# opt_prop_nonopt_prop_call_pass.md

> Normalize > Optional > Opt prop nonopt prop call pass
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = {b: {c: $}};
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
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall = tmpChainElementObject$1.call(tmpChainElementObject, 1);
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
const tmpIfTest = a != null;
if (tmpIfTest) {
  const tmpChainElementObject = a.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  tmpChainElementObject$1.call(tmpChainElementObject, 1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
