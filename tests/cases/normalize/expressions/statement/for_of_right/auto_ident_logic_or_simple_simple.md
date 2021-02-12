# Preval test case

# auto_ident_logic_or_simple_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_logic_or_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of 0 || 2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs = 0;
  if (tmpForOfDeclRhs) {
  } else {
    tmpForOfDeclRhs = 2;
  }
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs = 0;
  if (tmpForOfDeclRhs) {
  } else {
    tmpForOfDeclRhs = 2;
  }
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
