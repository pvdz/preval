# Preval test case

# auto_ident_upd_ip_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_upd_ip_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x of b++);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  const tmpPostUpdArgIdent = b;
  b = b + 1;
  const tmpForOfDeclRhs = tmpPostUpdArgIdent;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b + 1;
const tmpForOfDeclRhs = tmpPostUpdArgIdent;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
