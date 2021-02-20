# Preval test case

# opt_prop_nonopt_prop_opt_call_pass_assign.md

> Normalize > Optional > Opt prop nonopt prop opt call pass assign
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
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainElementObject$1.call(tmpChainElementObject, 1);
    x = tmpChainElementCall;
  }
}
$(x);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
let SSA_x = undefined;
const tmpIfTest = a != null;
if (tmpIfTest) {
  const tmpChainElementObject = a.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainElementObject$1.call(tmpChainElementObject, 1);
    SSA_x = tmpChainElementCall;
  }
}
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
