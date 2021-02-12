# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > statement > stmt_func_block > auto_ident_opt_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = { a: 999, b: 1000 };
    (1, 2, $(b))?.x;
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
    let a = { a: 999, b: 1000 };
    const tmpChainRootProp = $(b);
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.x;
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
    let b = { x: 1 };
    let a = { a: 999, b: 1000 };
    const tmpChainRootProp = $(b);
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.x;
    }
    $(a);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
