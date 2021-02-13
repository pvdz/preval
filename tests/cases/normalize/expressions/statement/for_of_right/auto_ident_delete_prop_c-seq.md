# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > for_of_right > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x of delete ($(1), $(2), $(arg)).y);
$(a, x);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  const tmpForOfDeclRhs = delete tmpDeleteObj.y;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, x_1);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  const tmpForOfDeclRhs = delete tmpDeleteObj.y;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, x_1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same