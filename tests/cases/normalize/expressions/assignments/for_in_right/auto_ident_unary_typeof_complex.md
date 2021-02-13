# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > assignments > for_in_right > auto_ident_unary_typeof_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = typeof $(arg)));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(arg);
  a = typeof tmpUnaryArg;
  let tmpForInDeclRhs = a;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(arg);
  a = typeof tmpUnaryArg;
  let tmpForInDeclRhs = a;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
