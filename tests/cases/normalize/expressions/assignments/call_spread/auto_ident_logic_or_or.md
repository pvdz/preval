# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Call spread > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(0);
a = tmpCallCallee$1(tmpCalleeParam);
if (a) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$3);
  }
}
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(0);
let a = $(tmpCalleeParam);
if (a) {
} else {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
  }
}
$(...a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
$( ... b );
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
