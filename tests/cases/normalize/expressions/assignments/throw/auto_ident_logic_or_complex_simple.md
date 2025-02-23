# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $($(0)) || 2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $($(0)) || 2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
a = tmpCallCallee(tmpCalleeParam);
if (a) {
} else {
  a = 2;
}
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam);
let tmpThrowArg /*:unknown*/ = 2;
if (a) {
  tmpThrowArg = a;
} else {
}
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
let c = 2;
if (b) {
  c = b;
}
throw c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
