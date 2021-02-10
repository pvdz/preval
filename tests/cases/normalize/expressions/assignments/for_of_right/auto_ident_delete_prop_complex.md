# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > assignments > for_of_right > auto_ident_delete_prop_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x of (a = delete $(x).y));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpDeleteObj = $(x_1);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x_1;
  for (x_1 of tmpForOfDeclRhs) {
  }
}
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
