# Preval test case

# auto_ident_unary_excl_simple.md

> normalize > expressions > assignments > for_in_right > auto_ident_unary_excl_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = !x));
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  a = !x_1;
  let tmpForInDeclRhs = a;
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
  a = !x_1;
  let tmpForInDeclRhs = a;
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
