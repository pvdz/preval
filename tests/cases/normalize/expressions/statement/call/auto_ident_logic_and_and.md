# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Call > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($($(1)) && $($(1)) && $($(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($($(1)) && $($(1)) && $($(2)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpCalleeParam) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam = tmpCallCallee$3(tmpCalleeParam$3);
  if (tmpCalleeParam) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    tmpCalleeParam = tmpCallCallee$5(tmpCalleeParam$5);
  } else {
  }
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpCalleeParam) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  tmpCalleeParam = $(tmpCalleeParam$3);
  if (tmpCalleeParam) {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    tmpCalleeParam = $(tmpCalleeParam$5);
  } else {
  }
} else {
}
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
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
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
$( b );
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
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
