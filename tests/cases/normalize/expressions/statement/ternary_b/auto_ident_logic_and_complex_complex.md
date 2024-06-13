# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? $($(1)) && $($(2)) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? $($(1)) && $($(2)) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  const tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpCallCallee$1(tmpCalleeParam$1);
  } else {
  }
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(1);
  const tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = $(2);
    $(tmpCalleeParam$1);
  } else {
  }
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  const c = $( b );
  if (c) {
    const d = $( 2 );
    $( d );
  }
}
else {
  $( 200 );
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
