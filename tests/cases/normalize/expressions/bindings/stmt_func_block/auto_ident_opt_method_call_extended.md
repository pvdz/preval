# Preval test case

# auto_ident_opt_method_call_extended.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_opt_method_call_extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: { d: { e: $ } } };

    let a = b?.c.d.e(1);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    const tmpObjLitVal$1 = { e: $ };
    const tmpObjLitVal = { d: tmpObjLitVal$1 };
    let b = { c: tmpObjLitVal };
    let a = undefined;
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementObject$1 = tmpChainElementObject.d;
      const tmpChainElementObject$2 = tmpChainElementObject$1.e;
      const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
      a = tmpChainElementCall;
    }
    $(a);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  {
    const tmpObjLitVal$1 = { e: $ };
    const tmpObjLitVal = { d: tmpObjLitVal$1 };
    let b = { c: tmpObjLitVal };
    let a = undefined;
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementObject$1 = tmpChainElementObject.d;
      const tmpChainElementObject$2 = tmpChainElementObject$1.e;
      const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
      a = tmpChainElementCall;
    }
    $(a);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
