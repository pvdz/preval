# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(1)) && $($(1)) && $($(2)))];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(1)) && $($(1)) && $($(2)))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
if (tmpArrElToSpread) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpArrElToSpread = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpArrElToSpread) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpArrElToSpread = tmpCallCallee$3(tmpCalleeParam$3);
  } else {
  }
} else {
}
[...tmpArrElToSpread];
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpArrElToSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpArrElToSpread) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpArrElToSpread = $(tmpCalleeParam$1);
  if (tmpArrElToSpread) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpArrElToSpread = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
[...tmpArrElToSpread];
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
[ ...b ];
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
