# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($(1) ? 2 : $($(100))) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($(1) ? 2 : $($(100))) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjSpreadArg = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpObjSpreadArg = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpObjSpreadArg = tmpCallCallee(tmpCalleeParam);
}
({ ...tmpObjSpreadArg });
$(a);
`````

## Output


`````js filename=intro
let tmpObjSpreadArg = 2;
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  tmpObjSpreadArg = $(tmpCalleeParam);
}
({ ...tmpObjSpreadArg });
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
{ ... a };
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
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
