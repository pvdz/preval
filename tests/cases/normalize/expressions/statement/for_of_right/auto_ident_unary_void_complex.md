# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > statement > for_of_right > auto_ident_unary_void_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of void $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $(100);
  const tmpForOfDeclRhs = undefined;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $(100);
  const tmpForOfDeclRhs = undefined;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
