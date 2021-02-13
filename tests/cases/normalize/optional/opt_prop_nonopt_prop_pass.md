# Preval test case

# opt_prop_nonopt_prop_call_pass.md

> normalize > optional > opt_prop_nonopt_prop_call_pass
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = {b: {c: 100}};
$(a?.b.c);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { c: 100 };
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  tmpCalleeParam = tmpChainElementObject$1;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { c: 100 };
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
if (a) {
  const tmpChainElementObject = a.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  tmpCalleeParam = tmpChainElementObject$1;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
