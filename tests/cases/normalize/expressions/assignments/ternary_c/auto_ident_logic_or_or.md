# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$5(tmpCalleeParam$5);
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(0);
  let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$5);
    }
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
const b = $( 0 );
if (b) {
  const c = $( 100 );
  $( c );
}
else {
  const d = $( 0 );
  let e = $( d );
  if (e) {

  }
  else {
    const f = $( 1 );
    e = $( f );
    if (e) {

    }
    else {
      const g = $( 2 );
      e = $( g );
    }
  }
  a = e;
  $( e );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
