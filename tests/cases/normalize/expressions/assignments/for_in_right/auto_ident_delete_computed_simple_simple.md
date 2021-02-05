# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > for_in_right > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x in (a = delete x["y"]));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  const tmpNestedComplexRhs = delete x['y'];
  a = tmpNestedComplexRhs;
  tmpForInDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpForInDeclRhs;
const tmpNestedComplexRhs = delete x.y;
a = tmpNestedComplexRhs;
tmpForInDeclRhs = tmpNestedComplexRhs;
let x;
for (x in tmpForInDeclRhs) {
}
$(a, x);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access 'x' before initialization ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'x' has already been declared ]>")
