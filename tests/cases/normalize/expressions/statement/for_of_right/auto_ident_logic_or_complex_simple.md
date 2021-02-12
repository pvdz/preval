# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_logic_or_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $($(0)) || 2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
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
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
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
 - 1: 0
 - 2: 0
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
