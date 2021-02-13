# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > for_of_right > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x of (a = delete $(arg)["y"]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = 'y';
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpDeleteCompObj = $(arg);
  a = delete tmpDeleteCompObj['y'];
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same