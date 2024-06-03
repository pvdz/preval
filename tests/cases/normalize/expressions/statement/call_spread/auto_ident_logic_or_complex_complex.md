# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(0)) || $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(0)) || $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(0);
let tmpCalleeParamSpread = tmpCallCallee$1(tmpCalleeParam);
if (tmpCalleeParamSpread) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(2);
  tmpCalleeParamSpread = tmpCallCallee$3(tmpCalleeParam$1);
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let tmpCalleeParamSpread = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  $(...tmpCalleeParamSpread);
} else {
  const tmpCalleeParam$1 = $(2);
  tmpCalleeParamSpread = $(tmpCalleeParam$1);
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
const a = $( 0 );
let b = $( a );
if (b) {
  $( ... b );
}
else {
  const c = $( 2 );
  b = $( c );
  const d = b === "";
  if (d) {
    $();
  }
  else {
    throw "Preval: Attempting to spread primitive that is not an empty string";
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
