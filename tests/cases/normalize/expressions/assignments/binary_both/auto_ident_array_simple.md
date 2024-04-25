# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) + (a = [1, 2, 3]));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) + (a = [1, 2, 3]));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = [1, 2, 3];
let tmpBinBothLhs = a;
a = [1, 2, 3];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = [1, 2, 3];
const tmpBinBothLhs = a;
a = [1, 2, 3];
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = [ 1, 2, 3 ];
const b = a;
a = [ 1, 2, 3 ];
const c = b + a;
$( c );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,2,31,2,3'
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
