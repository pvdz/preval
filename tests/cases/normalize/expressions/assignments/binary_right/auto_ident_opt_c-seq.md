# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > assignments > binary_right > auto_ident_opt_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = (1, 2, $(b))?.x));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = undefined;
const tmpChainRootProp = $(b);
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
a = undefined;
const tmpChainRootProp = $(b);
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 101
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same