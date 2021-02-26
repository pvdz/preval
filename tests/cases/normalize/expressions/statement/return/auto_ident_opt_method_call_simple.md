# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Return > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
function f() {
  return b?.c(1);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
    tmpReturnArg = tmpChainElementCall;
  }
  return tmpReturnArg;
};
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  let tmpReturnArg = undefined;
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject = b.c;
    const tmpChainElementCall = tmpChainElementObject.call(b, 1);
    tmpReturnArg = tmpChainElementCall;
  }
  return tmpReturnArg;
};
const b = { c: $ };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
