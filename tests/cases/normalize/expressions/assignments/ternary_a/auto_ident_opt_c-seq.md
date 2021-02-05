# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > assignments > ternary_a > auto_ident_opt_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))?.x) ? $(100) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest;
let tmpNestedComplexRhs = undefined;
1;
2;
const tmpChainRootProp = $(b);
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpNestedComplexRhs = tmpChainElementObject;
}
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest;
let tmpNestedComplexRhs = undefined;
const tmpChainRootProp = $(b);
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpNestedComplexRhs = tmpChainElementObject;
}
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - 3: 100
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
