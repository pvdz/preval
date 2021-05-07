# Preval test case

# opt_prop_nonopt_prop_opt_call_pass_var.md

> Normalize > Optional > Opt prop nonopt prop opt call pass var
>
> Make sure this works properly

#TODO

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
    const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 1);
    x = tmpChainElementCall;
  } else {
  }
} else {
}
$(x);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
let x = undefined;
const tmpIfTest = a == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = a.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 1);
    x = tmpChainElementCall;
  }
}
$(x);
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
