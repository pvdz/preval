# Preval test case

# auto_ident_cond_simple_simple_simple.md

> normalize > expressions > statement > for_in_right > auto_ident_cond_simple_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in 1 ? 2 : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs = undefined;
  if (1) {
    tmpForInDeclRhs = 2;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
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
let tmpForInDeclRhs = undefined;
tmpForInDeclRhs = 2;
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
