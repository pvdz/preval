# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > statement > arr_element > auto_ident_logic_and_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 && $($(1))) + (1 && $($(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpCallCallee(tmpCalleeParam);
}
{
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCallCallee$1(tmpCalleeParam$1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpCalleeParam = $(1);
  $(tmpCalleeParam);
}
{
  const tmpCalleeParam$1 = $(1);
  $(tmpCalleeParam$1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same