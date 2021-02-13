# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_unary_void_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let x of void arg);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  const tmpForOfDeclRhs = undefined;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let x;
  for (x of undefined) {
  }
}
$(a, 1);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
