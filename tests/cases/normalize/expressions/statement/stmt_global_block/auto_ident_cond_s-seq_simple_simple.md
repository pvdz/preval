# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > statement > stmt_global_block > auto_ident_cond_s-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  (10, 20, 30) ? $(2) : $($(100));
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  const tmpIfTest = 30;
  if (tmpIfTest) {
    $(2);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpCallCallee(tmpCalleeParam);
  }
  $(a);
}
`````

## Output

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  if (30) {
    $(2);
  } else {
    const tmpCalleeParam = $(100);
    $(tmpCalleeParam);
  }
  $(a);
}
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same