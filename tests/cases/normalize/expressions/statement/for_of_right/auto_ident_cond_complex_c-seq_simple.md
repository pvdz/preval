# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_cond_complex_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpForOfDeclRhs = $(60);
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
