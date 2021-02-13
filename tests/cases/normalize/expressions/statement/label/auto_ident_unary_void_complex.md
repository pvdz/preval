# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > statement > label > auto_ident_unary_void_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: void $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $(100);
  undefined;
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $(100);
  undefined;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same