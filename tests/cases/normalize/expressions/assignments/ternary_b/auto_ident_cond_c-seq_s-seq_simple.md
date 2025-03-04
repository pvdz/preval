# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))) : $(200));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    tmpNestedComplexRhs = 60;
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(100);
    tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs /*:unknown*/ = 60;
  const tmpIfTest$1 /*:unknown*/ = $(30);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(100);
    tmpNestedComplexRhs = $(tmpCalleeParam$1);
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
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
const b = $( 1 );
if (b) {
  let c = 60;
  const d = $( 30 );
  if (d) {

  }
  else {
    const e = $( 100 );
    c = $( e );
  }
  a = c;
  $( c );
}
else {
  const f = $( 200 );
  $( f );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 60
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
