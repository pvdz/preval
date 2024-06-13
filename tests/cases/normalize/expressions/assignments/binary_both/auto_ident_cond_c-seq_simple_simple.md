# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = (10, 20, $(30)) ? $(2) : $($(100))) +
    (a = (10, 20, $(30)) ? $(2) : $($(100)))
);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, $(30)) ? $(2) : $($(100))) + (a = (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpBinBothLhs = a;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = $(2);
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(100);
  a = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(30);
let tmpBinBothLhs = undefined;
if (tmpIfTest) {
  const tmpClusterSSA_a = $(2);
  tmpBinBothLhs = tmpClusterSSA_a;
} else {
  const tmpCalleeParam$1 = $(100);
  const tmpClusterSSA_a$1 = $(tmpCalleeParam$1);
  tmpBinBothLhs = tmpClusterSSA_a$1;
}
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = $(2);
  const tmpClusterSSA_tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$3 = $(100);
  a = $(tmpCalleeParam$3);
  const tmpClusterSSA_tmpCalleeParam$1 = tmpBinBothLhs + a;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 30 );
let c = undefined;
if (b) {
  const d = $( 2 );
  c = d;
}
else {
  const e = $( 100 );
  const f = $( e );
  c = f;
}
const g = $( 30 );
if (g) {
  a = $( 2 );
  const h = c + a;
  $( h );
}
else {
  const i = $( 100 );
  a = $( i );
  const j = c + a;
  $( j );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 30
 - 4: 2
 - 5: 4
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
