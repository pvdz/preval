# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > assignments > for_of_right > auto_ident_unary_void_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = void x));
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpNestedComplexRhs = undefined;
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x_1;
  for (x_1 of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpNestedComplexRhs = undefined;
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x_1;
  for (x_1 of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: BAD?!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Final output calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')
