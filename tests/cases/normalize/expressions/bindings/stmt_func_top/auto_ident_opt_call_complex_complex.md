# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_opt_call_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $($)?.($(1));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  if (tmpChainElementCall) {
    const tmpCallObj = tmpChainElementCall;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam = tmpChainRootCall;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
    a = tmpChainElementCall$1;
  }
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam$2 = f();
tmpCallCallee(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
