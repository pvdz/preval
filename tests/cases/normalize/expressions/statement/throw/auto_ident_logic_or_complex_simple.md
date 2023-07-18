# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(0)) || 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(0)) || 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpThrowArg = tmpCallCallee(tmpCalleeParam);
if (tmpThrowArg) {
} else {
  tmpThrowArg = 2;
}
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let tmpThrowArg = $(tmpCalleeParam);
if (tmpThrowArg) {
} else {
  tmpThrowArg = 2;
}
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  b = 2;
}
throw b;
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
