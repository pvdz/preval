# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(1)) && 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(1)) && 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpThrowArg = tmpCallCallee(tmpCalleeParam);
if (tmpThrowArg) {
  tmpThrowArg = 2;
} else {
}
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let tmpThrowArg = $(tmpCalleeParam);
if (tmpThrowArg) {
  tmpThrowArg = 2;
} else {
}
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  b = 2;
}
throw b;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
