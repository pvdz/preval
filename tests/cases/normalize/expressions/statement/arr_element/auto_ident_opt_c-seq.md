# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > statement > arr_element > auto_ident_opt_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x + (1, 2, $(b))?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
1;
2;
const tmpChainRootProp = $(b);
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
}
1;
2;
const tmpChainRootProp$1 = $(b);
if (tmpChainRootProp$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.x;
}
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpChainRootProp = $(b);
if (tmpChainRootProp) {
  tmpChainRootProp.x;
}
const tmpChainRootProp$1 = $(b);
if (tmpChainRootProp$1) {
  tmpChainRootProp$1.x;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
