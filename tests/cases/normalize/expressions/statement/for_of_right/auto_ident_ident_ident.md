# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > statement > for_of_right > auto_ident_ident_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
for (let x of (b = 2));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
{
  b = 2;
  let tmpForOfDeclRhs = b;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
{
  b = 2;
  let tmpForOfDeclRhs = b;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b, c);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
