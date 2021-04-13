# Preval test case

# opt_prop_nonopt_prop_opt_call_undef_method.md

> Normalize > Optional > Opt prop nonopt prop opt call undef method
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = {b: {}};
a?.b.c?.(1);
`````

## Pre Normal

`````js filename=intro
const a = { b: {} };
a?.b.c?.(1);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainElementObject$1.call(tmpChainElementObject, 1);
  } else {
  }
} else {
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpIfTest = a != null;
if (tmpIfTest) {
  const tmpChainElementObject = a.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    tmpChainElementObject$1.call(tmpChainElementObject, 1);
  } else {
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
