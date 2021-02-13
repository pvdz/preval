# Preval test case

# auto_ident_c-opt_simple_simple.md

> normalize > expressions > statement > stmt_func_block > auto_ident_c-opt_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = { a: 999, b: 1000 };
    b?.["x"];
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
    const tmpChainRootProp = b;
    const tmpIfTest = tmpChainRootProp != null;
    if (tmpIfTest) {
      const tmpChainRootComputed = 'x';
      const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
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
    const tmpChainRootProp = b;
    const tmpIfTest = tmpChainRootProp != null;
    if (tmpIfTest) {
      const tmpChainElementObject = tmpChainRootProp['x'];
    }
    $(a);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
