# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_opt_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  a = (1, 2, $(b))?.x;
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootProp = $(b);
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
  }
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootProp = $(b);
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
  }
  $(a);
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