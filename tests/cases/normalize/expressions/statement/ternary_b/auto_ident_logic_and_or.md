# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Ternary b > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? ($($(1)) && $($(1))) || $($(2)) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? ($($(1)) && $($(1))) || $($(2)) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$1 = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest$1) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpCallCallee$3(tmpCalleeParam$3);
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
  let tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$1 = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 = $(2);
    $(tmpCalleeParam$3);
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
  let c = $( b );
  if (c) {
    const d = $( 1 );
    c = $( d );
  }
  if (c) {

  }
  else {
    const e = $( 2 );
    $( e );
  }
}
else {
  $( 200 );
}
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
