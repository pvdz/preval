# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > statement > for_in_right > auto_ident_logic_||_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in 0 || $($(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs = 0;
  if (tmpForInDeclRhs) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpForInDeclRhs = tmpCallCallee(tmpCalleeParam);
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
let tmpForInDeclRhs = 0;
if (tmpForInDeclRhs) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpForInDeclRhs = tmpCallCallee(tmpCalleeParam);
}
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
