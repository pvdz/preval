# Preval test case

# ctxt_opt_abc_pass.md

> Normalize > Optional > Ctxt opt abc pass
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {b: {c: $}};
$($(a)?.b?.c?.(100));
`````

## Pre Normal

`````js filename=intro
const a = { b: { c: $ } };
$($(a)?.b?.c?.(100));
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.c;
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
      tmpCalleeParam = tmpChainElementCall$1;
    }
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainElementCall = $(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.c;
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
      tmpCalleeParam = tmpChainElementCall$1;
    }
  }
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '{"c":"\\"<$>\\""}' }
 - 2: 100
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
