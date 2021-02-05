# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_opt_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = (1, 2, $(b))?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = undefined;
1;
2;
const tmpChainRootProp = $(b);
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootProp = $(b);
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
