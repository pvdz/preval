# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > If > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpIfTest = a;
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  const tmpClusterSSA_a = $(2);
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
  const b = $( 2 );
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
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
