# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > statement > label > auto_ident_opt_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
label: (1, 2, $(b))?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
label: {
  const tmpChainRootProp = $(b);
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
  }
}
$(a);
`````

## Output

`````js filename=intro
({ x: 1 });
let a = { a: 999, b: 1000 };
label: {
  const tmpChainRootProp = $(b);
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined
