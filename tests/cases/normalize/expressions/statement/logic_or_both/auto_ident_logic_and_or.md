# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Logic or both > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && $($(1))) || $($(2)) || ($($(1)) && $($(1))) || $($(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && $($(1))) || $($(2)) || ($($(1)) && $($(1))) || $($(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
if (tmpIfTest) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    tmpIfTest = tmpCallCallee$5(tmpCalleeParam$5);
    if (tmpIfTest) {
      const tmpCallCallee$7 = $;
      const tmpCalleeParam$7 = $(1);
      tmpIfTest = tmpCallCallee$7(tmpCalleeParam$7);
    } else {
    }
    if (tmpIfTest) {
    } else {
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      tmpCallCallee$9(tmpCalleeParam$9);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
} else {
}
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 = $(2);
  tmpIfTest = $(tmpCalleeParam$3);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$5 = $(1);
    tmpIfTest = $(tmpCalleeParam$5);
    if (tmpIfTest) {
      const tmpCalleeParam$7 = $(1);
      tmpIfTest = $(tmpCalleeParam$7);
    } else {
    }
    if (tmpIfTest) {
    } else {
      const tmpCalleeParam$9 = $(2);
      $(tmpCalleeParam$9);
    }
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  b = $( d );
  if (b) {

  }
  else {
    const e = $( 1 );
    b = $( e );
    if (b) {
      const f = $( 1 );
      b = $( f );
    }
    if (b) {

    }
    else {
      const g = $( 2 );
      $( g );
    }
  }
}
const h = {
a: 999,
b: 1000
;
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
