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
  let tmpForInDeclRhs;
  let tmpNestedComplexRhs;
  const tmpNestedComplexRhs$1 = $(2);
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpForInDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
