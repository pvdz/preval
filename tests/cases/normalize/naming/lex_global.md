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

## Normalized

`````js filename=intro
{
  let a_1 = $(1);
  $(a_1);
}
let a = $(1);
$(a);
`````

## Output

`````js filename=intro
let a_1 = $(1);
$(a_1);
let a = $(1);
$(a);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: null
 - 2: 1
 - 3: null
 - 4: undefined

Normalized calls: Same

Final output calls: Same
