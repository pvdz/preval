# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_delete_computed_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x of delete x["y"]);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpForOfDeclRhs = delete x['y'];
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpForOfDeclRhs = delete x.y;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, x);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access 'x' before initialization ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'x' has already been declared ]>")
