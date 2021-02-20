# Preval test case

# global_lex.md

> Normalize > Naming > Global lex
>
> First a global binding shadowed by block binding

## Input

`````js filename=intro
let a = $(1);
$(a);
{
  let a = $(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = $(1);
$(a);
let a$1 = $(1);
$(a$1);
`````

## Output

`````js filename=intro
const a = $(1);
$(a);
const a$1 = $(1);
$(a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
