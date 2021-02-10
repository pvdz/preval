# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: { y: 1 } };

    let a = $(b)?.[$("x")]?.[$("y")];
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    const tmpObjLitVal = { y: 1 };
    let b = { x: tmpObjLitVal };
    let a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('x');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      if (tmpChainElementObject) {
        const tmpChainRootComputed$1 = $('y');
        const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
        a = tmpChainElementObject$1;
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
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
