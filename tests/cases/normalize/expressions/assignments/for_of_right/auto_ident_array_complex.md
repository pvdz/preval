# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > for_of_right > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = [$(1), 2, $(3)]));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$2 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
