# Preval test case

# opt_prop_nonopt_prop_call_pass.md

> normalize > optional > opt_prop_nonopt_prop_call_pass
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = {b: {}};
a?.b.c?.(1);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpChainRootProp = a;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  if (tmpChainElementObject$1) {
    const tmpChainElementCall = tmpChainElementObject$1.call(tmpChainElementObject, 1);
  }
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpChainRootProp = a;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  if (tmpChainElementObject$1) {
    tmpChainElementObject$1.call(tmpChainElementObject, 1);
  }
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
