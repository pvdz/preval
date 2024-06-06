# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(1)) && $($(2))) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(1)) && $($(2))) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpObjSpreadArg = tmpCallCallee(tmpCalleeParam);
if (tmpObjSpreadArg) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpObjSpreadArg = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
({ ...tmpObjSpreadArg });
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let tmpObjSpreadArg = $(tmpCalleeParam);
if (tmpObjSpreadArg) {
  const tmpCalleeParam$1 = $(2);
  tmpObjSpreadArg = $(tmpCalleeParam$1);
} else {
}
({ ...tmpObjSpreadArg });
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 2 );
  b = $( c );
}
{ ... b };
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
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
