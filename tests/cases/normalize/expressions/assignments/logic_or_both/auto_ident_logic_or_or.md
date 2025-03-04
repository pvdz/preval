# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) || (a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) || (a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$3);
  if (a) {
  } else {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$5);
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$7 = $;
  const tmpCalleeParam$7 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$7(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$9 = $;
    const tmpCalleeParam$9 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$9(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCallCallee$11 = $;
      const tmpCalleeParam$11 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$11(tmpCalleeParam$11);
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
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    $(a);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
    if (a) {
      $(a);
    } else {
      const tmpCalleeParam$7 /*:unknown*/ = $(0);
      let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$7);
      if (tmpNestedComplexRhs) {
      } else {
        const tmpCalleeParam$9 /*:unknown*/ = $(1);
        tmpNestedComplexRhs = $(tmpCalleeParam$9);
        if (tmpNestedComplexRhs) {
        } else {
          const tmpCalleeParam$11 /*:unknown*/ = $(2);
          tmpNestedComplexRhs = $(tmpCalleeParam$11);
        }
      }
      a = tmpNestedComplexRhs;
      $(tmpNestedComplexRhs);
    }
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {
  $( b );
}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    $( b );
  }
  else {
    const d = $( 2 );
    b = $( d );
    if (b) {
      $( b );
    }
    else {
      const e = $( 0 );
      let f = $( e );
      if (f) {

      }
      else {
        const g = $( 1 );
        f = $( g );
        if (f) {

        }
        else {
          const h = $( 2 );
          f = $( h );
        }
      }
      b = f;
      $( f );
    }
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
