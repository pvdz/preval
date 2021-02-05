# Preval test case

# opt_prop_nonopt_prop_call_pass.md

> normalize > optional > opt_prop_nonopt_prop_call_pass
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = undefined;
a?.b.c(1);
`````

## Normalized

`````js filename=intro
const a = undefined;
const tmpChainRootProp = a;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall = tmpChainElementObject$1.call(tmpChainElementObject, 1);
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
