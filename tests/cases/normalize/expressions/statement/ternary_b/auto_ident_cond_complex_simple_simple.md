# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Ternary b > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? ($(1) ? 2 : $($(100))) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? ($(1) ? 2 : $($(100))) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpCallCallee(tmpCalleeParam);
  }
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam /*:unknown*/ = $(100);
    $(tmpCalleeParam);
  }
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  if (b) {

  }
  else {
    const c = $( 100 );
    $( c );
  }
}
else {
  $( 200 );
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
