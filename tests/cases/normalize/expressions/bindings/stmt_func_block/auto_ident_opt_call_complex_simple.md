# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_opt_call_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $($)?.(1);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    if (tmpChainElementCall) {
      const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
      a = tmpChainElementCall$1;
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
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  if (tmpChainElementCall) {
    const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
    a = tmpChainElementCall$1;
  }
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
