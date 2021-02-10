# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > statement > switch_discriminant > auto_ident_unary_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch (typeof $(x)) {
  default:
    $(100);
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
const tmpSwitchTest = typeof tmpUnaryArg;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    $(100);
  }
}
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
