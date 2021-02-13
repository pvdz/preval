# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > statement > for_in_right > auto_ident_logic_or_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpForInDeclRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpForInDeclRhs) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpForInDeclRhs = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpForInDeclRhs) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpForInDeclRhs = tmpCallCallee$2(tmpCalleeParam$2);
    }
  }
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpCalleeParam = $(0);
  let tmpForInDeclRhs = $(tmpCalleeParam);
  if (tmpForInDeclRhs) {
  } else {
    const tmpCalleeParam$1 = $(1);
    tmpForInDeclRhs = $(tmpCalleeParam$1);
    if (tmpForInDeclRhs) {
      const tmpCalleeParam$2 = $(2);
      tmpForInDeclRhs = $(tmpCalleeParam$2);
    }
  }
  let x;
  for (x in tmpForInDeclRhs) {
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
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same