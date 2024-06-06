# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(1)) && 2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(1)) && 2));
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
  tmpCalleeParamSpread = 2;
} else {
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParamSpread = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  $(...2);
} else {
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
const b = $( a );
if (b) {
  $( ... 2 );
}
else {
  const c = b === "";
  if (c) {
    $();
  }
  else {
    throw "Preval: Attempting to spread primitive that is not an empty string";
  }
}
const d = {
a: 999,
b: 1000
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
