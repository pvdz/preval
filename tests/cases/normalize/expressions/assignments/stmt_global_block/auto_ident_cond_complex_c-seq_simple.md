# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = $(1) ? (40, 50, $(60)) : $($(100));
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = $(1) ? (40, 50, $(60)) : $($(100));
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpClusterSSA_a = $(60);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam = $(100);
  const tmpClusterSSA_a$1 = $(tmpCalleeParam);
  $(tmpClusterSSA_a$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
