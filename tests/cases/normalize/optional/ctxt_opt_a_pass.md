# Preval test case

# ctxt_opt_a_pass.md

> normalize > optional > ctxt_opt_a_pass
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {b: {c: function(...a){ $($(a), this); return a[0]; }}};
$($(a)?.b.c(100));
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = function (...a_1) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(a_1);
  const tmpCalleeParam$1 = this;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  const tmpReturnArg = a_1[0];
  return tmpReturnArg;
};
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
const tmpCallCallee$1 = $;
let tmpCalleeParam$2 = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
  tmpCalleeParam$2 = tmpChainElementCall$1;
}
tmpCallCallee$1(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = function (...a_1) {
  const tmpCalleeParam = $(a_1);
  const tmpCalleeParam$1 = this;
  $(tmpCalleeParam, tmpCalleeParam$1);
  const tmpReturnArg = a_1[0];
  return tmpReturnArg;
};
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
let tmpCalleeParam$2 = undefined;
const tmpChainElementCall = $(a);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
  tmpCalleeParam$2 = tmpChainElementCall$1;
}
$(tmpCalleeParam$2);
`````

## Result

Should call `$` with:
 - 1: { b: '{"c":"\\"function\\""}' }
 - 2: [100]
 - 3: [100], { c: '"function"' }
 - 4: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same