# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > statement > for_in_right > auto_ident_logic_or_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $($(0)) || $($(1)) || $($(2)));
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
  }
  if (tmpForInDeclRhs) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpForInDeclRhs = tmpCallCallee$2(tmpCalleeParam$2);
  }
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
