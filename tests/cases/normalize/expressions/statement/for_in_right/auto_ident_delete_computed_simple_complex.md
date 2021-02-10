# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > statement > for_in_right > auto_ident_delete_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x in delete x[$("y")]);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpDeleteCompObj = x_1;
  const tmpDeleteCompProp = $('y');
  const tmpForInDeclRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
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
