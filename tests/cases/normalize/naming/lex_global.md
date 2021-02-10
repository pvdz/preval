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
let a = $(2);
$(a);
`````

## Normalized

`````js filename=intro
{
  let a_1 = $(1);
  $(a_1);
}
let a = $(2);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
