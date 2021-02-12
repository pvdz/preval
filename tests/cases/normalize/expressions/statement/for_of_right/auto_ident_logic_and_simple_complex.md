# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > statement > for_of_right > auto_ident_logic_and_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of 1 && $($(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs = 1;
  if (tmpForOfDeclRhs) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
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
  let tmpForOfDeclRhs = 1;
  if (tmpForOfDeclRhs) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
  }
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
