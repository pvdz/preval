# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > assignments > for_in_right > auto_ident_upd_mi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = --b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpForInDeclRhs = a;
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
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpForInDeclRhs = a;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 0, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same