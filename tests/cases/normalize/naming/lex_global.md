# Preval test case

# global_lex.md

> normalize > naming > global_lex
>
> First a block binding shadowing a later global binding

## Input

`````js filename=intro
{
  let a = $(1);
  $(a);
}
let a = $(1);
$(a);
`````

## Output

`````js filename=intro
{
  let a_1 = $(1);
  $(a_1);
}
let a = $(1);
$(a);
`````
