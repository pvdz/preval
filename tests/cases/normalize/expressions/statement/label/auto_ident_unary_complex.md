# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > statement > label > auto_ident_unary_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
label: typeof $(x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
label: {
  const tmpUnaryArg = $(x);
  typeof tmpUnaryArg;
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
label: {
  const tmpUnaryArg = $(x);
  typeof tmpUnaryArg;
}
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 3
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined
