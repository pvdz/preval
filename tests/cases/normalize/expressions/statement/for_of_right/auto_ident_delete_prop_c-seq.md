# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > for_of_right > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x of delete ($(1), $(2), $(x)).y);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteObj = $(x);
  const tmpForOfDeclRhs = delete tmpDeleteObj.y;
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
$(1);
$(2);
const tmpDeleteObj = $(x);
const tmpForOfDeclRhs = delete tmpDeleteObj.y;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ("<crash[ Cannot access 'x' before initialization ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'x' has already been declared ]>")
