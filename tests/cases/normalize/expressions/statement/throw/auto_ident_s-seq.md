# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > Throw > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw ($(1), $(2), x);
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
throw ($(1), $(2), x);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpThrowArg = x;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
$(1);
$(2);
throw 1;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
throw 1;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
