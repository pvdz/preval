# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> normalize > expressions > statement > stmt_func_block > auto_ident_opt_method_opt_call_extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: { d: { e: $ } } };

    let a = { a: 999, b: 1000 };
    b?.c.d.e?.(1);
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
    let a = { a: 999, b: 1000 };
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementObject$1 = tmpChainElementObject.d;
      const tmpChainElementObject$2 = tmpChainElementObject$1.e;
      if (tmpChainElementObject$2) {
        const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
      }
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
