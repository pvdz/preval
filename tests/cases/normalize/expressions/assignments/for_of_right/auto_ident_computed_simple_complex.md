# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > assignments > for_of_right > auto_ident_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let x of (a = b[$("c")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $('c');
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $('c');
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
