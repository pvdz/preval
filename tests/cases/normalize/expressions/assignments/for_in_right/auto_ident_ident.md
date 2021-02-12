# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > for_in_right > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  a = b;
  tmpForInDeclRhs = b;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  a = b;
  tmpForInDeclRhs = b;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
