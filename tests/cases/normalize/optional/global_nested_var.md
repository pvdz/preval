# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
const a = 10,
      b = (a, $(2))?.toString,
      c = (1, b)?.length
$(c);
`````

## Normalized

`````js filename=intro
const a = 10;
let b = undefined;
const tmpChainRootProp = $(2);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.toString;
  b = tmpChainElementObject;
}
let c = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.length;
  c = tmpChainElementObject$1;
}
$(c);
`````

## Output

`````js filename=intro
let b = undefined;
const tmpChainRootProp = $(2);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.toString;
  b = tmpChainElementObject;
}
let c = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.length;
  c = tmpChainElementObject$1;
}
$(c);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
