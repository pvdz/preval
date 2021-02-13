# Preval test case

# auto_ident_opt_method_call_simple.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_opt_method_call_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: $ };

    let a = { a: 999, b: 1000 };
    a = b?.c(1);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = { c: $ };
    let a = { a: 999, b: 1000 };
    a = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest = tmpChainRootProp != null;
    if (tmpIfTest) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
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
    let b = { c: $ };
    let a = { a: 999, b: 1000 };
    a = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest = tmpChainRootProp != null;
    if (tmpIfTest) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
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
