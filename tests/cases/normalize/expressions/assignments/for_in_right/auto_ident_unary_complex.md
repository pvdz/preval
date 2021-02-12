# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > assignments > for_in_right > auto_ident_unary_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = typeof $(x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(x_1);
  a = typeof tmpUnaryArg;
  let tmpForInDeclRhs = a;
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(x_1);
  a = typeof tmpUnaryArg;
  let tmpForInDeclRhs = a;
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
