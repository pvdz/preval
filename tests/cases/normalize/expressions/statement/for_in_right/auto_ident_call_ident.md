# Preval test case

# auto_ident_call_ident.md

> normalize > expressions > statement > for_in_right > auto_ident_call_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpForInDeclRhs = $(1);
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInDeclRhs = $(1);
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
