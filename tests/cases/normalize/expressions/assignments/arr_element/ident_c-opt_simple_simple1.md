# Preval test case

# auto_ident_c-opt_simple_simple.md

> normalize > expressions > assignments > arr_element > auto_ident_c-opt_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
$(a = b?.x);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpNestedComplexRhs = tmpChainElementObject;
}
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
