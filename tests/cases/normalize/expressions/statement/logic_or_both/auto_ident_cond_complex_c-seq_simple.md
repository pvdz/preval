# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? (40, 50, $(60)) : $($(100))) || ($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? (40, 50, $(60)) : $($(100))) || ($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpIfTest = tmpCallCallee(tmpCalleeParam);
}
if (tmpIfTest) {
} else {
  const tmpIfTest$3 = $(1);
  if (tmpIfTest$3) {
    $(60);
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(100);
    tmpCallCallee$1(tmpCalleeParam$1);
  }
}
$(a);
`````

## Output


`````js filename=intro
let tmpIfTest = false;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  const tmpCalleeParam = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
} else {
  const tmpIfTest$3 = $(1);
  if (tmpIfTest$3) {
    $(60);
  } else {
    const tmpCalleeParam$1 = $(100);
    $(tmpCalleeParam$1);
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
const b = $( 1 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {

}
else {
  const d = $( 1 );
  if (d) {
    $( 60 );
  }
  else {
    const e = $( 100 );
    $( e );
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
