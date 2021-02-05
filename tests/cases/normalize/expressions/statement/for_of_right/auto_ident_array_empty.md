# Preval test case

# auto_ident_array_empty.md

> normalize > expressions > statement > for_of_right > auto_ident_array_empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of []);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpForOfDeclRhs = [];
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForOfDeclRhs = [];
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
