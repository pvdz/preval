# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = delete arg.y));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$($(100) + (a = delete arg.y));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = delete arg.y;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const arg = { y: 1 };
const a = delete arg.y;
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = { y: 1 };
const c = deleteb.y;
const d = a + c;
$( d );
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 101
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
