# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Logic or right > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || $($(0)) || $($(1)) || $($(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || $($(0)) || $($(1)) || $($(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpCallCallee$3(tmpCalleeParam$3);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(0);
  tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = $(tmpCalleeParam$1);
    if (tmpIfTest) {
    } else {
      const tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
    }
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 100 );
if (a) {

}
else {
  const b = $( 0 );
  a = $( b );
  if (a) {

  }
  else {
    const c = $( 1 );
    a = $( c );
    if (a) {

    }
    else {
      const d = $( 2 );
      $( d );
    }
  }
}
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
