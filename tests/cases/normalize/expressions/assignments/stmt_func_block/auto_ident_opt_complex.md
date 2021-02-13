# Preval test case

# auto_ident_opt_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_opt_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = { a: 999, b: 1000 };
    a = $(b)?.x;
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
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    if (tmpChainElementCall) {
      const tmpChainElementObject = tmpChainElementCall.x;
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
function f() {
  {
    let b = { x: 1 };
    let a = { a: 999, b: 1000 };
    a = undefined;
    const tmpChainElementCall = $(b);
    if (tmpChainElementCall) {
      const tmpChainElementObject = tmpChainElementCall.x;
      a = tmpChainElementObject;
    }
    $(a);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same