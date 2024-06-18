# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))) +
    (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100)))
);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))) + (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpBinBothLhs = a;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = 60;
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
let a = 60;
const tmpIfTest = $(30);
let tmpBinBothLhs = 60;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(100);
  const tmpClusterSSA_a = $(tmpCalleeParam$1);
  tmpBinBothLhs = tmpClusterSSA_a;
}
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam = tmpBinBothLhs + 60;
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
let a = 60;
const b = $( 30 );
let c = 60;
if (b) {

}
else {
  const d = $( 100 );
  const e = $( d );
  c = e;
}
const f = $( 30 );
if (f) {
  const g = c + 60;
  $( g );
}
else {
  const h = $( 100 );
  a = $( h );
  const i = c + a;
  $( i );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 30
 - 3: 120
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
