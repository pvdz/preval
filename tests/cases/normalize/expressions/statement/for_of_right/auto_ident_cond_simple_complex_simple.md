# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_cond_simple_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of 1 ? $(2) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs = undefined;
  if (1) {
    tmpForOfDeclRhs = $(2);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
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
let tmpForOfDeclRhs = undefined;
tmpForOfDeclRhs = $(2);
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
