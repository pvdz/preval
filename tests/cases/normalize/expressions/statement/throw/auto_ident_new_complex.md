# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw new ($($))(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw new ($($))(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpThrowArg = new tmpNewCallee(1);
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const tmpThrowArg /*:object*/ = new tmpNewCallee(1);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
throw b;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
