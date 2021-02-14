# Preval test case

# auto_ident_unary_minus_complex.md

> normalize > expressions > statement > for_in_right > auto_ident_unary_minus_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in -$(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(100);
  const tmpForInDeclRhs = -tmpUnaryArg;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(100);
  const tmpForInDeclRhs = -tmpUnaryArg;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
