# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > assignments > if > auto_ident_opt_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
if ((a = (1, 2, $(b))?.x));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
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
tmpIfTest;
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest;
let tmpNestedComplexRhs = undefined;
const tmpChainRootProp = $(b);
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpNestedComplexRhs = tmpChainElementObject;
}
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
