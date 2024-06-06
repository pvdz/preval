# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
a = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
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
const tmpIfTest = $(30);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCalleeParam = $(100);
  const tmpClusterSSA_a = $(tmpCalleeParam);
  $(tmpClusterSSA_a);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  $( 60 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
}
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
