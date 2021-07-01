# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident cond complex simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = $(1) ? 2 : $($(100));
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = $(1) ? 2 : $($(100));
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output

`````js filename=intro
let a = 0;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
