# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident cond c-seq c-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpIfTest = $(30);
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
const tmpIfTest = $(30);
if (tmpIfTest) {
  const tmpClusterSSA_a = $(60);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam = $(100);
  const tmpClusterSSA_a$1 = $(tmpCalleeParam);
  $(tmpClusterSSA_a$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  const b = $( 60 );
  $( b );
}
else {
  const c = $( 100 );
  const d = $( c );
  $( d );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
