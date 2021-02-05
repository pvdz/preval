# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > for_of_right > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = b--));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  const tmpNestedComplexRhs = tmpPostUpdArgIdent;
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs;
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpNestedComplexRhs = tmpPostUpdArgIdent;
a = tmpNestedComplexRhs;
tmpForOfDeclRhs = tmpNestedComplexRhs;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
