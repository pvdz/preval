# Preval test case

# auto_ident_c-opt_simple_simple.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_c-opt_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = b?.["x"];
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = { x: 1 };
    let a = undefined;
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainRootComputed = 'x';
      const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
      a = tmpChainElementObject;
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
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
