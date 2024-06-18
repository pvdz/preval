# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Call spread > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = ($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = ($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(1);
a = tmpCallCallee$1(tmpCalleeParam);
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$1);
} else {
}
if (a) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$5(tmpCalleeParam$3);
}
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let a = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
} else {
}
if (a) {
  $(...a);
} else {
  const tmpCalleeParam$3 = $(2);
  a = $(tmpCalleeParam$3);
  const tmpIfTest = a === ``;
  if (tmpIfTest) {
    $();
  } else {
    throw `Preval: Attempting to spread primitive that is not an empty string`;
  }
}
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
  $( ... b );
}
else {
  const d = $( 2 );
  b = $( d );
  const e = b === "";
  if (e) {
    $();
  }
  else {
    throw "Preval: Attempting to spread primitive that is not an empty string";
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
