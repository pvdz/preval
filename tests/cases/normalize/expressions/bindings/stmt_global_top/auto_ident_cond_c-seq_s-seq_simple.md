# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident cond c-seq s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
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
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
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
 - 1: 30
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
