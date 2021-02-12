# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > statement > for_in_right > auto_ident_unary_void_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x in void x);
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  const tmpForInDeclRhs = undefined;
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  let x_1;
  for (x_1 in undefined) {
  }
}
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: BAD?!
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Final output calls: BAD!!
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined
