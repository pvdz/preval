# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(0)) || $($(2)))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(0)) || $($(2)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpArrElToSpread = tmpCallCallee$1(tmpCalleeParam$1);
}
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let tmpArrElToSpread = $(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
  const tmpCalleeParam$1 = $(2);
  tmpArrElToSpread = $(tmpCalleeParam$1);
}
[...tmpArrElToSpread];
const a = { a: 999, b: 1000 };
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
  const c = $( 2 );
  b = $( c );
}
[ ... b ];
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
