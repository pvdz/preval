# Preval test case

# opt_prop_nonopt_prop_call_pass.md

> normalize > optional > opt_prop_nonopt_prop_call_pass
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
let x = 100;
const a = {b: {c: $}};
x = a?.b.c?.(1);
$(x);
`````

## Normalized

`````js filename=intro
let x = 100;
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
x = undefined;
const tmpChainRootProp = a;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  if (tmpChainElementObject$1) {
    const tmpChainElementCall = tmpChainElementObject$1.call(tmpChainElementObject, 1);
    x = tmpChainElementCall;
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = 100;
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
x = undefined;
const tmpChainRootProp = a;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  if (tmpChainElementObject$1) {
    const tmpChainElementCall = tmpChainElementObject$1.call(tmpChainElementObject, 1);
    x = tmpChainElementCall;
  }
}
$(x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
