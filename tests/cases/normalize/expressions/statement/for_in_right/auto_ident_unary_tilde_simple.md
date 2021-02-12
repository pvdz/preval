# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > statement > for_in_right > auto_ident_unary_tilde_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x in ~x);
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  const tmpForInDeclRhs = ~x_1;
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
  const tmpForInDeclRhs = ~x_1;
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
