# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > statement > for_in_right > auto_ident_logic_or_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $($(0)) || $($(2)));
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
    const tmpCalleeParam$1 = $(2);
    tmpForInDeclRhs = tmpCallCallee$1(tmpCalleeParam$1);
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
    const tmpCalleeParam$1 = $(2);
    tmpForInDeclRhs = $(tmpCalleeParam$1);
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
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same