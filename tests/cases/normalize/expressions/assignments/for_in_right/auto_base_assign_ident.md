# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > assignments > for_in_right > auto_base_assign_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = b = $(2)));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  const tmpNestedComplexRhs = $(2);
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
  const tmpNestedComplexRhs = $(2);
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
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same