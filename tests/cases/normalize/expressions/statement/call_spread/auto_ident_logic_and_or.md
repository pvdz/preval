# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(1);
let tmpCalleeParamSpread = tmpCallCallee$1(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParamSpread = tmpCallCallee$3(tmpCalleeParam$1);
} else {
}
if (tmpCalleeParamSpread) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$3 = $(2);
  tmpCalleeParamSpread = tmpCallCallee$5(tmpCalleeParam$3);
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
let tmpCalleeParamSpread = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParamSpread = $(tmpCalleeParam$1);
} else {
}
if (tmpCalleeParamSpread) {
  $(...tmpCalleeParamSpread);
} else {
  const tmpCalleeParam$3 = $(2);
  tmpCalleeParamSpread = $(tmpCalleeParam$3);
  const tmpIfTest = tmpCalleeParamSpread === ``;
  if (tmpIfTest) {
    $();
  } else {
    throw `Preval: Attempting to spread primitive that is not an empty string`;
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
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
