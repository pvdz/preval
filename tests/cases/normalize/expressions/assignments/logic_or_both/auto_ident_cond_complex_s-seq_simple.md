# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $(1) ? (40, 50, 60) : $($(100))) || (a = $(1) ? (40, 50, 60) : $($(100)))
);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? (40, 50, 60) : $($(100))) || (a = $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    tmpNestedComplexRhs = 60;
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(100);
    tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = 60;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
  const tmpClusterSSA_tmpCalleeParam = a;
  if (a) {
    $(tmpClusterSSA_tmpCalleeParam);
  } else {
    let tmpNestedComplexRhs = 60;
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam$3 = $(100);
      tmpNestedComplexRhs = $(tmpCalleeParam$3);
    }
    a = tmpNestedComplexRhs;
    $(tmpNestedComplexRhs);
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 60;
const b = $( 1 );
if (b) {
  $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
  const d = a;
  if (a) {
    $( d );
  }
  else {
    let e = 60;
    const f = $( 1 );
    if (f) {

    }
    else {
      const g = $( 100 );
      e = $( g );
    }
    a = e;
    $( e );
  }
}
$( a );
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
