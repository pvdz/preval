# Preval test case

# ctxt_cmp_opt_a_pass.md

> Normalize > Optional > Ctxt cmp opt a pass
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {b: {c: function(...a){ $($(a), this); return a[0]; }}};
$($(a)?.[$('b')][$('c')](100));
`````

## Pre Normal

`````js filename=intro
const a = {
  b: {
    c: function (...$$0) {
      const tmpthis = this;
      let a$1 = $$0;
      debugger;
      $($(a$1), tmpthis);
      return a$1[0];
    },
  },
};
$($(a)?.[$(`b`)][$(`c`)](100));
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = function (...$$0) {
  const tmpthis = this;
  let a$1 = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(a$1);
  const tmpCalleeParam$1 = tmpthis;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
};
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
const tmpCallCallee$1 = $;
let tmpCalleeParam$3 = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`b`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  tmpCalleeParam$3 = tmpChainElementCall$1;
} else {
}
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = function (...$$0) {
  const tmpthis = this;
  const a$1 = $$0;
  debugger;
  const tmpCalleeParam = $(a$1);
  $(tmpCalleeParam, tmpthis);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
};
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
let tmpCalleeParam$3 = undefined;
const tmpChainElementCall = $(a);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`b`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  tmpCalleeParam$3 = tmpChainElementCall$1;
}
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '{"c":"\\"<function>\\""}' }
 - 2: 'b'
 - 3: 'c'
 - 4: [100]
 - 5: [100], { c: '"<function>"' }
 - 6: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
