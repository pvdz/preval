# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(0)) || $($(2))) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(0)) || $($(2))) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpObjSpreadArg = tmpCallCallee(tmpCalleeParam);
if (tmpObjSpreadArg) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpObjSpreadArg = tmpCallCallee$1(tmpCalleeParam$1);
}
({ ...tmpObjSpreadArg });
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(0);
let tmpObjSpreadArg = $(tmpCalleeParam);
if (tmpObjSpreadArg) {
} else {
  const tmpCalleeParam$1 = $(2);
  tmpObjSpreadArg = $(tmpCalleeParam$1);
}
({ ...tmpObjSpreadArg });
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
{ ... b };
const d = {
  a: 999,
  b: 1000,
};
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
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
