# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > statement > for_in_right > auto_ident_logic_or_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $($(0)) || 2);
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
    tmpForInDeclRhs = 2;
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
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpForInDeclRhs = tmpCallCallee(tmpCalleeParam);
if (tmpForInDeclRhs) {
} else {
  tmpForInDeclRhs = 2;
}
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
