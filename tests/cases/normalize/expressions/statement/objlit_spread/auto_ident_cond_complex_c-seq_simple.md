# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($(1) ? (40, 50, $(60)) : $($(100))) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($(1) ? (40, 50, $(60)) : $($(100))) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjSpreadArg = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpObjSpreadArg = $(60);
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
let tmpObjSpreadArg = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpObjSpreadArg = $(60);
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
let a = undefined;
const b = $( 1 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
{ ... a };
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
 - 1: 1
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
