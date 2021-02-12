# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > statement > for_of_right > auto_ident_logic_or_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $($(0)) || ($($(1)) && $($(2))));
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
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpForOfDeclRhs = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpForOfDeclRhs) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpForOfDeclRhs = tmpCallCallee$2(tmpCalleeParam$2);
    }
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
  const tmpCalleeParam = $(0);
  let tmpForOfDeclRhs = $(tmpCalleeParam);
  if (tmpForOfDeclRhs) {
  } else {
    const tmpCalleeParam$1 = $(1);
    tmpForOfDeclRhs = $(tmpCalleeParam$1);
    if (tmpForOfDeclRhs) {
      const tmpCalleeParam$2 = $(2);
      tmpForOfDeclRhs = $(tmpCalleeParam$2);
    }
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
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
