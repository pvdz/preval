# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt method call simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: $ };

  let a = b?.c(1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { c: $ };
  let a = b?.c(1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { c: $ };
  let a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (b$1, a$1, tmpChainRootProp$1, tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.c;
    const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainRootProp$1, 1);
    a$1 = tmpChainElementCall$1;
    const tmpReturnArg = tmpBranchingC(b$1, a$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (b$2, a$2, tmpChainRootProp$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(b$2, a$2, tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (b$3, a$3, tmpChainRootProp$3, tmpIfTest$3) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { c: $ };
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = b.c;
    const tmpChainElementCall$1 = tmpChainElementObject$1.call(b, 1);
    $(tmpChainElementCall$1);
    return undefined;
  } else {
    $(undefined);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
