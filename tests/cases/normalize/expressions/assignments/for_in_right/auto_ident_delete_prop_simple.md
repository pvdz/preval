# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > assignments > for_in_right > auto_ident_delete_prop_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x in (a = delete x.y));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  const tmpNestedComplexRhs = delete x_1.y;
  a = tmpNestedComplexRhs;
  tmpForInDeclRhs = tmpNestedComplexRhs;
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
